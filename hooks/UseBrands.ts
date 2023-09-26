import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useBrands = () => {
  const { data, error, mutate } = useSWR("/api/brand", fetcher)
  const isLoading = !data && !error
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useBrands
