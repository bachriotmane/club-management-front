
const imageTest = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzTWQoCUbRNdiyorem5Qp1zYYhpliR9q0Bw&s';
const demandes = [
    { id: 1, date: '13/05/2024', demandeur: { name: 'John Doe', image: imageTest }, status: 'Accepte', description: 'This is a description for demande #1' },
    { id: 2, date: '22/05/2024', demandeur: { name: 'Jane Smith', image: imageTest }, status: 'Accepte', description: 'This is a description for demande #2' },
];

const DemandeDetails = () => {

    const demande = demandes[0];

    if (!demande) {
        return <div className="p-6 text-center">Demande not found</div>;
    }

    return (
        <div className="w-full h-screen p-6 bg-gray-50">
            <button
                className="text-blue-500 mb-4"
            >
                &larr; Back
            </button>
            <h2 className="text-2xl font-bold mb-4">Demande Details</h2>
            <h4 className="text-xl font-semibold mb-4">Demande de creation d'un nouvel clubs</h4>
            <div className="mb-6 p-2 rounded-2xl flex items-center space-x-4 bg-gray-200">
                <img src={demande.demandeur.image} alt="Demandeur" className="w-16 h-16 rounded-full"/>
                <div>
                    <p className="font-semibold">{demande.demandeur.name}</p>
                </div>
            </div>
            <div className="mb-6">
                <p><span className="font-semibold">ID:</span> #{demande.id}</p>
                <p className="my-3"><span className="font-semibold">Date:</span> {demande.date}</p>
                <p><span className="font-semibold">Status:</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-white ${getStatusClass(demande.status)}`}>
            {demande.status}
          </span>
                </p>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold text-lg">Description:</h3>
                <p>{demande.description}</p>
            </div>
            <div className="flex space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Accept
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Reject
                </button>
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

export default DemandeDetails;
