import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useCountStock = () => {
  const { data, error, mutate } = useSWR("/api/admin/stockcount", fetcher)
  const isLoading = !data && !error
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useCountStock
