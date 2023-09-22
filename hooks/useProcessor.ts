import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useProcessor = () => {
  const { data, error, mutate } = useSWR("/api/processor", fetcher)
  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useProcessor
