import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKey, restFetcher } from "../../queryClient";
import { GetMovies } from "../../type";

export const useFetchMoviesData = (QueryKey: string, data: string) => {
  return useInfiniteQuery(
    [`${QueryKey}`], // 매개변수로
    ({ pageParam = 1 }) =>
      restFetcher({
        method: "GET",
        path: `/api/${data}`, // 매개변수로
        params: {
          page: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return page < totalPages ? page + 1 : undefined;
      },
    }
  );
};

export default useFetchMoviesData;
