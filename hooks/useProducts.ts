import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/product", fetcher)
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useCurrentUser
