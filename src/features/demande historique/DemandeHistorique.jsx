import { useFetchDemandeHistorique } from "../../repositories/demande.repository";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const DemandeHistorique = () => {
  const params = useParams();
  const { data, isError, error, isLoading } = useFetchDemandeHistorique(params.id);

  if (isLoading) {
    return (
      <div className="p-5">
        <p className="text-center text-gray-500 dark:text-gray-400">Chargement des données...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5">
        <p className="text-center text-red-500 dark:text-red-400">
          Une erreur est survenue : {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {data && data.length > 0 ? (
          data.map((historique) => {
            const { id, titre, description, date } = historique;
            const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm");
            return (
              <li key={id} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {formattedDate}
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {titre}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Aucun historique trouvé.</p>
        )}
      </ol>
    </div>
  );
};

export default DemandeHistorique;
