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
import { CollectionsPinterestGrid } from "@/components/CollectionsPinterestGrid"

export const metadata: Metadata = {
  title: "Ese Cosmetics - Embellece tu rutina diaria",
  description:
    "Descubre la colección de cosméticos de Ese Cosmetics. Ofrecemos productos de alta calidad para embellecer tu rutina diaria. Compra ahora y disfruta de descuentos exclusivos y envíos rápidos.",
}

const InformationSection: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-rose-100">
      <Layout className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <LayoutColumn>
          <h3 className="text-lg md:text-2xl mb-8 md:mb-12 text-grayscale-600">¿Por qué elegir Ese Cosmetics?</h3>
        </LayoutColumn>
        <LayoutColumn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 text-grayscale-700">
            <div className="bg-white rounded-r-md rounded-bl-md p-4 md:p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-4 md:p-6 inline-block">
                <RiDiscountPercentFill className="w-8 h-8 md:w-10 md:h-10 text-rose-400" />
              </div>
              <h3 className="text-sm md:text-md font-semibold mb-4 md:mb-6">DESCUENTOS</h3>
              <p>Por compras a partir de $150.000 obtienes el <span className="font-semibold">7% de DESCUENTO</span>.<br /> Por compras superiores a $600.000 obtienes el <span className="font-semibold">10% de DESCUENTO</span> en el total de la factura. ¡Aplica para todos los productos!.</p>
            </div>
            <div className="bg-white rounded-r-md rounded-bl-md p-4 md:p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-4 md:p-6 inline-block">
                <BsCashCoin className="w-8 h-8 md:w-10 md:h-10 text-rose-400" />
              </div>
              <h3 className="text-sm md:text-md font-semibold mb-4 md:mb-6">PAGOS</h3>
              <p>Solo trabajamos con <span className="font-semibold">PAGO ANTICIPADO DE LOS PRODUCTOS</span>, el costo del envío lo cancelas cuando te entreguen el paquete.</p>
            </div>
            <div className="bg-white rounded-r-md rounded-bl-md p-4 md:p-8 flex flex-col items-center opacity-80">
              <div className="bg-pink-100 hover:bg-pink-200 rounded-full p-4 md:p-6 inline-block">
                <FaTruck className="w-8 h-8 md:w-10 md:h-10 text-rose-400" />
              </div>
              <h3 className="text-sm md:text-md font-semibold mb-4 md:mb-6">ENVÍOS</h3>
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
      <div className="relative w-full h-125 md:h-screen">
        <Image
          src="/images/content/hero.webp"
          fill
          alt="Background"
          quality={100}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 bg-black/10">
          <h1 className="font-header text-xl lg:text-2xl">Embellece tu rutina diaria</h1>
          <h2 className="font-header font-normal text-lg">Explora nuestra colección de cosméticos</h2>
          <LocalizedButtonLink href="/store" className="mt-6">
            Comprar ahora
          </LocalizedButtonLink>
        </div>
      </div>
      <div className="py-12 md:py-20 bg-white">
        <Layout className="px-4 md:px-8 max-w-screen-xl mx-auto">
          <LayoutColumn>
            <CollectionsPinterestGrid />
          </LayoutColumn>
        </Layout>
      </div>
      <div className="py-12 md:py-20 bg-white">
        <Carousel
          heading={<h3 className="text-lg md:text-2xl mb-8 md:mb-16 text-grayscale-600">Categorías</h3>}
          className="px-4 md:px-8 max-w-screen-xl mx-auto"
        >
          {categories.map((category) => (
            <div
              className="w-[40%] md:w-[25%] flex-shrink-0"
              key={category.id}
            >
              <LocalizedLink href={`/categories/${category.handle}`}>
                {typeof category.metadata?.image === "string" && (
                  <div className="relative rounded-md overflow-hidden shadow-lg mb-4 md:mb-6 w-full aspect-[4/5]">
                    <Image
                      src={category.metadata.image}
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
      </div>
      <div className="py-12 md:py-20 bg-white">
        <Layout className="px-4 md:px-8 max-w-screen-xl mx-auto">
          <LayoutColumn>
            <h3 className="text-lg md:text-2xl mb-8 md:mb-12 text-grayscale-600">Lo más vendido</h3>
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
      </div>
      <InformationSection />
      <div className="py-12 md:py-20 bg-white">
        <Layout className="px-4 md:px-8 max-w-screen-xl mx-auto">
          <LayoutColumn>
            <InstagramCarousel />
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
