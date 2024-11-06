import React from 'react';
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

            <table className="min-w-full border">

            </table>

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
