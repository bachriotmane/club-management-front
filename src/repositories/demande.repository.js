import { toast } from "react-toastify";
import axiosInstance from "../auth/axios.js";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const apiUrl = "/demandes";

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
export const useDeactivateUser = () =>{
  const { mutate: deactivateUser, isPending, isError } = useMutation({
    mutationFn: (integrationId ) => axiosInstance.patch(`/clubs/deactivate/${integrationId}`),
    onError: (error) => {
      toast.error(error?.response?.data?.msg || 'Une erreur est survenue.');
    },
  })
  return {deactivateUser,isError,isPending};
}

export const useFetchDemandeHistorique = (demandeId) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['historique', demandeId], 
    queryFn: async () => {
      const { data } = await axiosInstance.get(`demandes/historique/${demandeId}`);
      return data;
    },
    enabled: !!demandeId,
  });

  return { isLoading, isError, data, error };
};

export const useFetchAdminClubs = () => {
  const { data ,isLoading ,isError,error } = useQuery({
    queryKey: ['clubsListAdmin'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/clubs/adminClub');
      return data;
    },
  });
  return {data,isLoading ,isError,error};
};

export const useCreateIntegrationDemande = () => {
  const queryClient = useQueryClient();
  const { mutate: createIntegrationDemande, isPending } = useMutation({
    mutationFn: ({ clubId, motivation }) => axiosInstance.post(`/demandes/integration/depose?clubId=${clubId}`, { motivation }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubsList'] });
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createIntegrationDemande, isPending };
}; 

export const useCreateClubDemande = () => {
  const { mutate: createClubDemande, isPending } = useMutation({
    mutationFn: (demandeCreation) => axiosInstance.post(`/demandes/creation/depose`, demandeCreation ),
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createClubDemande, isPending };
}; 

export const useCreateEventDemande = () => {
  const { mutate: createEventDemande, isPending } = useMutation({
    mutationFn: ({clubId,formattedDemande}) => axiosInstance.post(`/demandes/organization/depose?clubId=${clubId}`, formattedDemande ),
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createEventDemande, isPending };
};  

export const editRoleStudent = async ({ uuid, roleName, memberRole }) => {
  try {
    const response = await axiosInstance.put(
      `${apiUrl}/edit-integration/${uuid}`,
      {},
      {
        params: {
          roleName: roleName,
          memberRole: memberRole,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIntegration = async (id) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/integration/delete/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


export const getDemandeDetails = async (id) => {
  try {
    console.log(id)
    const resp = await axiosInstance.get(
        `${apiUrl}/demande-details/${id}`,
    );
    return resp.data;
  } catch (error) {
    console.log("ERROR",error)
    throw error;
  }
};