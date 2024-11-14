import { getCategoryByHandle } from '@lib/data/categories';
import { getRegion } from '@lib/data/regions';
import CategoryTemplate from '@modules/categories/templates';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{ countryCode: string; handle: string }>
}

export default async function CategoryPage({ searchParams, params }: Props) {
  const { sortBy, page } = await searchParams
  const { handle, countryCode } = await params
  const region = await getRegion(countryCode)
  const category = (await getCategoryByHandle([handle])).product_categories[0]

  if (!region) {
    notFound()
  }

  return (
    <CategoryTemplate
      title={category.name}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
      category={[category.id]}
    />
  )
}
