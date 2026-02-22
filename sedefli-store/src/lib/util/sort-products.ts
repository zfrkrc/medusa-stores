import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface MinPricedProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
}

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  let sortedProducts = products as MinPricedProduct[]

  if (["price_asc", "price_desc"].includes(sortBy)) {
    // Precompute the minimum price for each product
    sortedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product._minPrice = Math.min(
          ...product.variants.map(
            (variant) => variant?.calculated_price?.calculated_amount || 0
          )
        )
      } else {
        product._minPrice = Infinity
      }
    })

    // Sort products based on the precomputed minimum prices
    sortedProducts.sort((a, b) => {
      const diff = a._minPrice! - b._minPrice!
      return sortBy === "price_asc" ? diff : -diff
    })
  }

  if (sortBy === "created_at") {
    sortedProducts.sort((a, b) => {
      return (
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      )
    })
  }

  if (sortBy === "sale") {
    sortedProducts.sort((a: any, b: any) => {
      const aOnSale = a.variants?.some((v: any) => v.calculated_price?.price_list_type === "sale")
      const bOnSale = b.variants?.some((v: any) => v.calculated_price?.price_list_type === "sale")

      if (aOnSale && !bOnSale) return -1
      if (!aOnSale && bOnSale) return 1

      if (aOnSale && bOnSale) {
        // Both on sale, sort by highest discount percentage
        const aMaxDiscount = Math.max(...a.variants!.map((v: any) => {
          const original = v.calculated_price?.original_amount || 0
          const calculated = v.calculated_price?.calculated_amount || 0
          return original > 0 ? (original - calculated) / original : 0
        }))
        const bMaxDiscount = Math.max(...b.variants!.map((v: any) => {
          const original = v.calculated_price?.original_amount || 0
          const calculated = v.calculated_price?.calculated_amount || 0
          return original > 0 ? (original - calculated) / original : 0
        }))
        return bMaxDiscount - aMaxDiscount
      }

      return 0
    })
  }

  return sortedProducts
}
