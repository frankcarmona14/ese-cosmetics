import Product from "../product-preview"
import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Carousel } from "@/components/Carousel"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {
    limit: 13,
  }
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product?.categories) {
    queryParams.category_id = [product.categories[0].id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags.map((t) => t.value).filter(Boolean)
  }
  queryParams.is_giftcard = false

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <>
      <Carousel
        heading={<h3 className="text-lg md:text-2xl">Productos relacionados</h3>}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[70%] sm:w-[60%] lg:w-full max-w-72 flex-shrink-0"
          >
            <Product region={region} product={product} />
          </div>
        ))}
      </Carousel>
    </>
  )
}
