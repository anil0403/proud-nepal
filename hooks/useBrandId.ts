import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useBrandId = (brandId: string) => {
  const { data, error, mutate } = useSWR(`/api/brand/${brandId}`, fetcher)

  const isLoading = !data && !error

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useBrandId
