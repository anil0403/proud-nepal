import useSWR from 'swr'


import fetcher from "@/lib/fetcher"

const useProducts = () => {
  const { data, error, mutate } = useSWR("/api/product", fetcher)

  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
export default useProducts
