"use client"

import { isEqual, set } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Radio, RadioGroup } from "react-aria-components"
import { addToCart } from "@lib/data/cart"
import { getVariantItemsInStock } from "@lib/util/inventory"
import { Button } from "@/components/Button"
import { NumberField } from "@/components/NumberField"
import ProductPrice from "../product-price"
import { toast } from "@medusajs/ui"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  materials: {
    id: string
    name: string
    colors: {
      id: string
      name: string
      hex_code: string
    }[]
  }[]
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) {
      acc[varopt.option_id] = varopt.value
    }
    return acc
  }, {})
}

const priorityOptions = ["Material", "Color", "Size"]

const getInitialOptions = (product: ProductActionsProps["product"]) => {
  if (product.variants?.length === 1) {
    const variantOptions = optionsAsKeymap(product.variants[0].options)
    return variantOptions ?? {}
  }

  if (product.options) {
    const singleOptionValues = product.options
      .filter((option) => option.values)
      .filter((option) => option.values!.length === 1)
      .reduce(
        (acc, option) => {
          acc[option.id] = option.values![0].value
          return acc
        },
        {} as Record<string, string>
      )

    return singleOptionValues
  }

  return null
}

export default function ProductActions({
  product,
  materials,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    getInitialOptions(product) ?? {}
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState("")
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    const initialOptions = getInitialOptions(product)
    if (initialOptions) {
      setOptions(initialOptions)
    }
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected variant is in stock
  const itemsInStock = selectedVariant
    ? getVariantItemsInStock(selectedVariant)
    : 0

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      setError("Por favor selecciona un color")
      return null
    }

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    toast.success("Producto añadido al carrito")

    setIsAdding(false)
  }

  const handleSetQuantity = (value: number) => {
    if (!selectedVariant?.id) {
      setError("Por favor selecciona un color")
      return
    }

    setQuantity(value)

  }

  const hasMultipleVariants = (product.variants?.length ?? 0) > 1
  const productOptions = (product.options || []).sort((a, b) => {
    let aPriority = priorityOptions.indexOf(a.title ?? "")
    let bPriority = priorityOptions.indexOf(b.title ?? "")

    if (aPriority === -1) {
      aPriority = priorityOptions.length
    }

    if (bPriority === -1) {
      bPriority = priorityOptions.length
    }

    return aPriority - bPriority
  })

  const materialOption = productOptions.find((o) => o.title === "Material")
  const colorOption = productOptions.find((o) => o.title === "Color")
  const otherOptions =
    materialOption && colorOption
      ? productOptions.filter(
        (o) => o.id !== materialOption.id && o.id !== colorOption.id
      )
      : productOptions

  const selectedMaterial =
    materialOption && options[materialOption.id]
      ? materials.find((m) => m.name === options[materialOption.id])
      : undefined

  const showOtherOptions =
    !materialOption ||
    !colorOption ||
    (selectedMaterial &&
      (selectedMaterial.colors.length < 2 || options[colorOption.id]))

  return (
    <>
      <ProductPrice product={product} variant={selectedVariant} />
      <div className="max-md:text-xs mb-8 md:mb-12 max-w-120 text-grayscale-600">
        <p>{product.description}</p>
      </div>
      {hasMultipleVariants && (
        <div className="flex flex-col gap-8 md:gap-6 mb-10 md:mb-16">
          {colorOption && (
            <div className={`p-4 rounded-md border ${error ? 'border-red-900' : ''}`}>
              <p className="mb-4">
                Colores
                <span className="text-grayscale-500 ml-6">
                  {options[colorOption.id]}
                </span>
              </p>
              <RadioGroup
                value={options[colorOption.id] ?? null}
                onChange={(value) => {
                  setOptionValue(colorOption.id, value)
                  setError("")
                }}
                aria-label="Color"
                className="flex gap-3 mb-2"
                isDisabled={!!disabled || isAdding}
              >
                {selectedMaterial?.colors.map((color) => (
                  <Radio
                    key={color.id}
                    value={color.name}
                    aria-label={color.name}
                    className="h-6 w-6 cursor-pointer relative before:transition-colors before:absolute before:content-[''] before:-bottom-2 before:left-0 before:w-full before:h-px data-[selected]:before:bg-black shadow-sm hover:shadow"
                    style={{ background: color.hex_code }}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          {error && <p className="text-red-900 mb-4">{error}</p>}
        </div>
      )}
      <div className="flex max-sm:flex-col gap-4 mb-4">
        <NumberField
          value={quantity}
          onChange={handleSetQuantity}
          minValue={1}
          maxValue={itemsInStock}
          className="w-full sm:w-35 max-md:justify-center max-md:gap-2"
          aria-label="Quantity"
        />
        <Button
          onPress={handleAddToCart}
          disabled={!itemsInStock || !selectedVariant || !!disabled || isAdding}
          isLoading={isAdding}
          className="sm:flex-1"
        >
          {!selectedVariant
            ? "Selecciona un Color"
            : !itemsInStock
              ? "Producto agotado"
              : "Añadir al carrito"}
        </Button>
      </div>
    </>
  )
}
