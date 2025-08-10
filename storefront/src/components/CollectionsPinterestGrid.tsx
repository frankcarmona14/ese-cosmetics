import Image from "next/image"
import { getCollectionsList } from "@lib/data/collections"
import { LocalizedLink } from "@/components/LocalizedLink"
import { Layout, LayoutColumn } from "@/components/Layout"

export const CollectionsPinterestGrid: React.FC<{ className?: string }> = async ({
  className,
}) => {
  const collections = await getCollectionsList(0, 20, [
    "id",
    "title",
    "handle",
    "metadata",
  ])

  if (!collections || collections.collections.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <Layout>
        <LayoutColumn>
          <h3 className="text-lg md:text-2xl mb-8 md:mb-16 text-grayscale-600">Colecciones</h3>
        </LayoutColumn>
        <LayoutColumn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.collections.slice(0, 6).map((collection, index) => (
              <div
                key={collection.id}
                className={`group cursor-pointer ${
                  index === 0 ? 'lg:col-span-2 md:row-span-2' : 
                  index === 1 ? 'md:col-span-1 md:row-span-1' :
                  index === 2 ? 'md:col-span-1 md:row-span-1' :
                  index === 3 ? 'lg:col-span-3 md:row-span-1' :
                  'md:col-span-1 md:row-span-1'
                }`}
              >
                <LocalizedLink href={`/collections/${collection.handle}`}>
                  <div className="relative overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    {collection.handle || collection.metadata?.image ? (
                      <div className="relative w-full h-full min-h-[200px] md:min-h-[250px]">
                        <Image
                          src={typeof collection.metadata?.image === "string" ? collection.metadata.image : `/images/content/${collection.handle}.png`}
                          alt={collection.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[200px] md:min-h-[250px] bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                        <div className="text-rose-500 text-4xl md:text-5xl font-bold group-hover:scale-110 transition-transform duration-300">
                          {collection.title.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-sm md:text-md font-semibold text-white group-hover:text-rose-200 transition-colors duration-300 drop-shadow-lg">
                        {collection.title}
                      </h3>
                    </div>
                  </div>
                </LocalizedLink>
              </div>
            ))}
          </div>
        </LayoutColumn>
      </Layout>
    </div>
  )
} 