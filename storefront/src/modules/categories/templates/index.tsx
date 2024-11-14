import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import { Suspense } from 'react';

const CategoryTemplate = async ({
  title,
  sortBy,
  collection,
  category,
  page,
  countryCode,
}: {
  title?: string
  sortBy?: SortOptions
  collection?: string[]
  category?: string[]
  type?: string[]
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="py-36 md:pb-36">
      <RefinementList
        title={title}
        sortBy={sortBy}
        collection={collection}
      />
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sortBy}
          page={pageNumber}
          countryCode={countryCode}
          categoryId={category}
        />
      </Suspense>
    </div>
  )
}

export default CategoryTemplate;