import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { Layout, LayoutColumn } from "@/components/Layout"
import ProductActionsWrapper from "./product-actions-wrapper"
import { Toaster } from "@medusajs/ui"

type ProductTemplateProps = {
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
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  materials,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const images = product.images || []
  const hasImages = Boolean(
    product.images &&
    product.images.filter((image) => Boolean(image.url)).length > 0
  )

  // const collectionDetails = collectionMetadataCustomFieldsSchema.safeParse(
  //   product.collection?.metadata ?? {}
  // )

  return (
    <div
      className="pt-26 lg:pt-37 pb-23 md:pb-36"
      data-testid="product-container"
    >
      <Toaster position="top-center" />
      <Layout>
        <LayoutColumn className="mb-16">
          <div className="flex items-center max-lg:flex-col gap-8 xl:gap-27">
            {hasImages && (
              <div className="w-[75%] lg:w-1/2 flex flex-1 flex-col gap-8">
                <ImageGallery images={images} />
              </div>
            )}
            <div className="sticky flex-1 flex flex-col justify-center">
              <ProductInfo product={product} />
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    materials={materials}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper
                  id={product.id}
                  materials={materials}
                  region={region}
                />
              </Suspense>
            </div>
            {!hasImages && <div className="flex-1" />}
          </div>
        </LayoutColumn>
      </Layout>

      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts product={product} countryCode={countryCode} />
      </Suspense>
    </div>
  )
}

export default ProductTemplate
