const imageTest = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzTWQoCUbRNdiyorem5Qp1zYYhpliR9q0Bw&s';
const demandes = [
    { id: 1, date: '13/05/2024', demandeur: { name: 'John Doe', image: imageTest }, status: 'Accepte' },
    { id: 2, date: '22/05/2024', demandeur: { name: 'Jane Smith', image:imageTest  }, status: 'Accepte' },
    { id: 3, date: '15/06/2024', demandeur: { name: 'Alice Johnson', image: imageTest }, status: 'En cours' },
    { id: 4, date: '06/09/2024', demandeur: { name: 'Bob Brown', image: imageTest }, status: 'En cours' },
    { id: 5, date: '25/09/2024', demandeur: { name: 'Charlie Black', image: imageTest }, status: 'Rejete' },
];

const DemandesListing = () => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className='my-2 text-2xl'>Demandes</h1>
            <table className="min-w-full border">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Demandeur</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Action</th>
                </tr>
                </thead>
                <tbody>
                {demandes.map((demande) => (
                    <tr key={demande.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border text-center">#{demande.id}</td>
                        <td className="px-4 py-2 border flex items-center space-x-2">
                            <img src={demande.demandeur.image} alt="Demandeur" className="w-8 h-8 rounded-full"/>
                            <span>{demande.demandeur.name}</span>
                        </td>
                        <td className="px-4 py-2 border text-center">{demande.date}</td>
                        <td className="px-4 py-2 border text-center">
                <span className={`px-3 py-1 rounded-full text-white ${getStatusClass(demande.status)}`}>
                  {demande.status}
                </span>
                        </td>
                        <td className="px-4 py-2 border text-center">
                            <button className="text-green-500 hover:text-green-700 mx-1">
                                &#10004;
                            </button>
                            <button className="text-red-500 hover:text-red-700 mx-1">
                                &#10006;
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center space-x-2 mt-4">
                <button className="px-2 py-1 rounded bg-gray-200">1</button>
                <button className="px-2 py-1 rounded bg-gray-200">2</button>
                <span className="px-2 py-1">...</span>
                <button className="px-2 py-1 rounded bg-gray-200">10</button>
            </div>
        </div>
    );
};

const getStatusClass = (status) => {
    switch (status) {
        case 'Accepte':
            return 'bg-green-400';
        case 'En cours':
            return 'bg-yellow-400';
        case 'Rejete':
            return 'bg-red-400';
        default:
            return 'bg-gray-200';
    }
};

export default DemandesListing;
