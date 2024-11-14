// External
import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { getProductTypesList } from "@lib/data/product-types"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink, LocalizedLink } from "@/components/LocalizedLink"
import { CollectionsSection } from "@/components/CollectionsSection"
import { Button } from "@/components/Button"
import { Carousel } from "@/components/Carousel"
import { getCategoriesList } from "@lib/data/categories"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const ProductTypesSection: React.FC = async () => {
  const productTypes = await getProductTypesList(0, 20, [
    "id",
    "value",
    "metadata",
  ])

  if (!productTypes) {
    return null
  }

  return (
    <Layout className="mb-26 md:mb-36 max-md:gap-x-2">
      <LayoutColumn>
        <h3 className="text-lg md:text-2xl mb-8 md:mb-15">Lo más vendido</h3>
      </LayoutColumn>
      {productTypes.productTypes.map((productType, index) => (
        <LayoutColumn
          key={productType.id}
          start={index % 2 === 0 ? 1 : 7}
          end={index % 2 === 0 ? 7 : 13}
        >
          <LocalizedLink href={`/store?type=${productType.value}`}>
            {typeof productType.metadata?.image === "object" &&
              productType.metadata.image &&
              "url" in productType.metadata.image &&
              typeof productType.metadata.image.url === "string" && (
                <Image
                  src={productType.metadata.image.url}
                  width={60}
                  height={40}
                  alt={productType.value}
                  className="mb-2 md:mb-8"
                />
              )}
            <p className="text-xs md:text-md">{productType.value}</p>
          </LocalizedLink>
        </LayoutColumn>
      ))}
    </Layout>
  )
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const categoriesResponse = await getCategoriesList(0, 20, ["id", "name", "handle", "metadata", "rank"])
  const categories = categoriesResponse.product_categories.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))

  return (
    <>
      <div className="max-md:pt-18">
        <div className="absolute w-full h-125 md:h-screen bg-black bg-opacity-10">
          <div className="flex flex-col items-center gap-4 lg:gap-6 justify-center w-full h-full text-white text-center">
            <h1 className="font-header text-xl lg:text-2xl">Embellece tu rutina diaria</h1>
            <h2 className="font-header font-normal text-lg">Explora nuestra colección de cosméticos</h2>
            <LocalizedLink href="/store">
              <Button className="sm:flex-1 font-semibold">Comprar</Button>
            </LocalizedLink>
          </div>
        </div>
        <Image
          src="/images/content/hero.webp"
          width={2880}
          height={1500}
          alt="Background"
          quality={100}
          className="h-125 md:h-screen"
        />
      </div>
      <div className="py-26">
        <Carousel
          heading={<h3 className="text-lg md:text-2xl">Categorias</h3>}
          className="mb-16 md:mb-26"
        >
          {categories.map((category) => (
            <div
              className="w-[40%] md:w-[30%] flex-shrink-0"
              key={category.id}
            >
              <LocalizedLink href={`/categories/${category.handle}`}>
                {typeof category.metadata?.image === "string" && (
                    <div className="relative rounded-md overflow-hidden shadow-lg mb-4 md:mb-6 w-full aspect-[1/1]">
                      <Image
                        src={category.metadata.image}
                        alt={category.name}
                        fill
                        objectFit="cover"
                      />
                    </div>
                  )}
                <h3 className="md:text-md mb-2 md:mb-4 text-center text-grayscale-600">{category.name}</h3>
                {/* {typeof collection.metadata?.description === "string" &&
                  collection.metadata?.description.length > 0 && (
                    <p className="text-xs text-grayscale-500 md:text-md">
                      {collection.metadata.description}
                    </p>
                  )} */}
              </LocalizedLink>
            </div>
          ))}
        </Carousel>
        <CollectionsSection className="mb-26 md:mb-36" />
      </div>
    </>
  )
}
