// External components
import * as React from "react"

// Lib
// import { listRegions } from "@lib/data/regions"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink, LocalizedLink } from "@/components/LocalizedLink"
import { CartIcon } from "./CartIcon"
import { HeaderDrawer } from "./HeaderDrawer"
// import { RegionSwitcher } from "./RegionSwitcher"
import { HeaderWrapper } from "./HeaderWrapper"
import Image from "next/image"

export const Header: React.FC = async () => {
  // const regions = await listRegions()

  // const countryOptions = regions
  //   .map((r) => {
  //     return (r.countries ?? []).map((c) => ({
  //       country: c.iso_2,
  //       region: r.id,
  //       label: c.display_name,
  //     }))
  //   })
  //   .flat()
  //   .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))

  return (
    <>
      <HeaderWrapper>
        <Layout>
          <LayoutColumn>
            <div className="flex justify-between items-center h-18 md:h-21">
              <h1 className="font-medium text-md">
                <LocalizedLink href="/">
                  <div className="md:bg-white rounded-full p-1">
                    <Image src="/images/content/logo-ese-cosmetics.png"
                      width={60}
                      height={60}
                      alt="Logo"
                      quality={100}
                      className="w-[60] h-[60] md:w-[70] md:h-[70]"
                    />
                  </div>
                </LocalizedLink>
              </h1>
              <div className="backdrop-blur-sm text-grayscale-600 bg-white/30 px-3 py-4 font-medium rounded-lg">
                <div className="flex items-center gap-8 max-md:hidden">
                  <LocalizedLink href="/store" className="hover:text-grayscale-800">Tienda</LocalizedLink>
                  <LocalizedLink href="/categories/esmaltes" className="hover:text-grayscale-800">Esmaltes</LocalizedLink>
                  <LocalizedLink href="/categories/maquillaje" className="hover:text-grayscale-800">Maquillaje</LocalizedLink>
                  <LocalizedLink href="/categories/skin-care" className="hover:text-grayscale-800">Skin Care</LocalizedLink>
                  <LocalizedLink href="/categories/decoraciones" className="hover:text-grayscale-800">Decoraciones</LocalizedLink>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-6 max-md:hidden">
                {/* <RegionSwitcher
                  countryOptions={countryOptions}
                  className="w-16"
                  selectButtonClassName="bg-transparent border-0 h-auto !gap-0 !p-1 w-full"
                  selectIconClassName="text-current"
                /> */}
                {/* <Button
                  variant="ghost"
                  className="p-1 group-data-[light=true]:md:text-white group-data-[sticky=true]:md:text-black"
                >
                  <Icon name="search" className="w-5 h-5" />
                </Button> */}
                {/* <Button
                  variant="ghost"
                  className="p-1 group-data-[light=true]:md:text-white"
                >
                  <Icon name="user" className="w-6 h-6" />
                </Button> */}

                <LocalizedButtonLink
                  href="/cart"
                  variant="ghost"
                  className="p-1 group-data-[light=true]:md:text-white group-data-[sticky=true]:md:text-rose-400"
                >
                  <CartIcon className="w-6 h-6" />
                </LocalizedButtonLink>
              </div>
              <div className="flex items-center gap-6 md:hidden">
                <LocalizedButtonLink
                  href="/cart"
                  variant="ghost"
                  className="p-1 text-rose-400"
                >
                  <CartIcon className="w-6 h-6" wrapperClassName="w-6 h-6" />
                </LocalizedButtonLink>
                <HeaderDrawer countryOptions={[]} />
              </div>
            </div>
          </LayoutColumn>
        </Layout>
      </HeaderWrapper>
    </>
  )
}
