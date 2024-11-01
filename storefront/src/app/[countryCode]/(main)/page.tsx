// External
import { Metadata } from "next"
import Image from "next/image"

import { getRegion } from "@lib/data/regions"
import { getProductTypesList } from "@lib/data/product-types"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedLink } from "@/components/LocalizedLink"
import { CollectionsSection } from "@/components/CollectionsSection"
import { Button } from "@/components/Button"

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
        <h3 className="text-lg md:text-2xl mb-8 md:mb-15">Our products</h3>
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
                  width={1200}
                  height={900}
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
          alt="Living room"
          quality={100}
          className="h-125 md:h-screen"
        />
      </div>
      <div className="pt-8 pb-26 md:pt-26 md:pb-36">
        <Layout className="mb-26 md:mb-34">
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-2xl">
              Elevate Your Living Space with Unmatched Comfort & Style
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <div className="flex items-center h-full">
              <div className="text-md">
                <p>Discover Your Perfect Sofa Today</p>
                <LocalizedLink href="/store" variant="underline">
                  Explore Now
                </LocalizedLink>
              </div>
            </div>
          </LayoutColumn>
        </Layout>
        <ProductTypesSection />
        <CollectionsSection className="mb-26 md:mb-36" />
        <Layout>
          <LayoutColumn className="col-span-full">
            <h3 className="text-lg md:text-2xl mb-8 md:mb-15">
              About Sofa Society
            </h3>
            <Image
              src="/images/content/sofa2.png"
              width={2496}
              height={1400}
              alt="Sofa"
              className="mb-8 md:mb-16 max-md:aspect-[3/2] max-md:object-cover"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, md: 7 }}>
            <h2 className="text-lg md:text-2xl">
              At Sofa Society, we believe that a sofa is the heart of every
              home.
            </h2>
          </LayoutColumn>
          <LayoutColumn
            start={{ base: 1, md: 8 }}
            end={13}
            className="mt-6 md:mt-19"
          >
            <div className="md:text-md">
              <p className="mb-5 md:mb-9">
                We are dedicated to delivering high-quality, thoughtfully
                designed sofas that merge comfort and style effortlessly.
              </p>
              <p className="mb-5 md:mb-3">
                Our mission is to transform your living space into a sanctuary
                of relaxation and beauty, with products built to last.
              </p>
              <LocalizedLink href="/about" variant="underline">
                Read more about Sofa Society
              </LocalizedLink>
            </div>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
