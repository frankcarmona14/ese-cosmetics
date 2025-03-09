// External
import { Metadata } from "next"

import { getRegion } from "@lib/data/regions"
import { getProductTypesList } from "@lib/data/product-types"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink, LocalizedLink } from "@/components/LocalizedLink"
import { Carousel } from "@/components/Carousel"
import { getCategoriesList } from "@lib/data/categories"
import Image from "next/image"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { RiDiscountPercentFill } from "react-icons/ri"
import { BsCashCoin } from "react-icons/bs"
import { FaTruck } from "react-icons/fa"
import InstagramCarousel from "@/components/InstagramCarousel"

export const metadata: Metadata = {
  title: "Ese Cosmetics - Embellece tu rutina diaria",
  description:
    "Descubre la colección de cosméticos de Ese Cosmetics. Ofrecemos productos de alta calidad para embellecer tu rutina diaria. Compra ahora y disfruta de descuentos exclusivos y envíos rápidos.",
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

const InformationSection: React.FC = () => {
  return (
    <div className="py-16 bg-rose-100">
      <Layout>
        <LayoutColumn>
          <h3 className="text-lg md:text-2xl mb-16 text-grayscale-600">¿Por qué elegir Ese Cosmetics?</h3>
        </LayoutColumn>
        <LayoutColumn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-grayscale-700">
            <div className="bg-white rounded-r-md rounded-bl-md p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-6 inline-block">
                <RiDiscountPercentFill className="w-10 h-10 text-rose-400" />
              </div>
              <h3 className="text-md font-semibold mb-6">DESCUENTOS</h3>
              <p>Por compras a partir de $150.000 obtienes el <span className="font-semibold">7% de DESCUENTO</span>.<br /> Por compras superiores a $600.000 obtienes el <span className="font-semibold">10% de DESCUENTO</span> en el total de la factura. ¡Aplica para todos los productos!.</p>
            </div>
            <div className="bg-white rounded-r-md rounded-bl-md p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-6 inline-block">
                <BsCashCoin className="w-10 h-10 text-rose-400" />
              </div>
              <h3 className="text-md font-semibold mb-6">PAGOS</h3>
              <p>Solo trabajamos con <span className="font-semibold">PAGO ANTICIPADO DE LOS PRODUCTOS</span>, el costo del envío lo cancelas cuando te entreguen el paquete.</p>
            </div>
            <div className="bg-white rounded-r-md rounded-bl-md p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-6 inline-block">
                <FaTruck className="w-10 h-10 text-rose-400" />
              </div>
              <h3 className="text-md font-semibold mb-6">ENVÍOS</h3>
              <p>Todos los pedidos pagados antes de las <span className="font-semibold">11:00 AM SALEN EL MISMO DÍA</span></p>
            </div>
          </div>
        </LayoutColumn>
      </Layout>
    </div>
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
          <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 justify-center h-full text-white text-center">
            <h1 className="font-header text-xl lg:text-2xl">Embellece tu rutina diaria</h1>
            <h2 className="font-header font-normal text-lg">Explora nuestra colección de cosméticos</h2>
            <LocalizedButtonLink href="/store">
              Comprar ahora
            </LocalizedButtonLink>
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
          heading={<h3 className="text-lg md:text-2xl text-grayscale-600">Categorias</h3>}
          className="mb-16"
        >
          {categories.map((category) => (
            <div
              className="w-[40%] md:w-[25%] flex-shrink-0"
              key={category.id}
            >
              <LocalizedLink href={`/categories/${category.handle}`}>
                {typeof category.metadata?.imageUrl === "string" && (
                  <div className="relative rounded-md overflow-hidden shadow-lg mb-4 md:mb-6 w-full aspect-[4/5]">
                    <Image
                      src={category.metadata.imageUrl}
                      alt={category.name}
                      fill
                      objectFit="cover"
                    />
                  </div>
                )}
                <h3 className="md:text-md text-center text-grayscale-600">{category.name}</h3>
              </LocalizedLink>
            </div>
          ))}
        </Carousel>
        <Layout>
          <LayoutColumn>
            <h3 className="text-lg md:text-2xl mb-16 text-grayscale-600">Lo más vendido</h3>
          </LayoutColumn>
          <LayoutColumn>
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                countryCode={countryCode}
                collectionId={process.env.NEXT_PUBLIC_BEST_SELLING_COLLECTION_ID ?? "pcol_01JCY8G61A874V08APXEACSKGR"}
                page={1}
              />
            </Suspense>
          </LayoutColumn>
        </Layout>
        <InformationSection />
        <InstagramCarousel />
      </div >
    </>
  )
}
