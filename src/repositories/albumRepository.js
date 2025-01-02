import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../auth/axios";

export const useFetchClubAlbums = (clubId) => {
    const { isLoading, data, isError, error } = useQuery({
      queryKey: ['albumList'],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`/album/${clubId}`);
        return data;
      },
    });
    return { isLoading, isError, data ,error};
  };