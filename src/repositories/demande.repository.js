import { toast } from "react-toastify";
import axiosInstance from "../auth/axios.js";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchNotJoinedClubs = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['clubsList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/clubs/notJoinedClubs');
      return data;
    },
  });
  return { isLoading, isError, data ,error};
};

export const useCreateIntegrationDemande = () => {
  const queryClient = useQueryClient();
  const { mutate: createIntegrationDemande, isPending } = useMutation({
    mutationFn: ({ clubId, motivation }) => axiosInstance.post(`/demandes/integration/depose?clubId=${clubId}`, { motivation }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubsList'] });
      toast.success('Demande hhhhh');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createIntegrationDemande, isPending };
}; 
export const useCreateClubDemande = () => {
  const { mutate: createClubDemande, isPending } = useMutation({
    mutationFn: (demandeCreation) => axiosInstance.post(`/demandes/organization/depose?clubId${clubId}`, { motivation }),
    onSuccess: () => {
      toast.success('Demande hhhhh');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createClubDemande, isPending };
}; 

export const useCreateEventDemande = () => {
  const { mutate: createEventDemande, isPending } = useMutation({
    mutationFn: (formattedDemande) => axiosInstance.post(`/demandes/creation/depose`, formattedDemande ),
    onSuccess: () => {
      toast.success('Demande hhhhh');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createEventDemande, isPending };
}; 
