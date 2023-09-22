import useSWR from "swr"

import fetcher from "@/lib/fetcher"

const useBillboards = () => {
  const { data, error, mutate } = useSWR("/api/billboard", fetcher)
  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useBillboards
