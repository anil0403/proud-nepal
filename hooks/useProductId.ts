import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useCurrentUser = (productId: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/product/${productId}`,
    fetcher
  )
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useCurrentUser
