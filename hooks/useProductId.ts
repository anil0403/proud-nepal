import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useProductId = (productId: string) => {
  const { data, error, mutate } = useSWR(`/api/product/${productId}`, fetcher)

  const isLoading = !data && !error

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useProductId
