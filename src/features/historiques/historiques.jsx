let historiquesData = [
    {
        date: 'le 16 janvier 2024',
        title: 'La demande a ete refuse par Mr Abid Kamal',
        description: '',
    },
    {
        date: 'le 12 janvier 2024',
        title: 'La demande a ete deposer par Mr BACHRI Otmane',
        description: '',
    }
];

const Historiques = ({ title = " Historiques de la demande" }) => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {historiquesData.map((historique, index) => (
                    <li key={index} className={`mb-10 ms-4`}>
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">
                            {historique.date}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {historique.title}
                        </h3>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            {historique.description}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Historiques;
