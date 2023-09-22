import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useRam = () => {
  const { data, error, mutate } = useSWR("/api/ram", fetcher)
  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useRam
