import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useGraphic = () => {
  const { data, error, mutate } = useSWR("/api/graphic", fetcher)
  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useGraphic
