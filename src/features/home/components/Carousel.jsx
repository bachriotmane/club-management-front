import React, { useState, useRef } from 'react';

const Carousel = ({ items, CardComponent, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Indice des éléments visibles dans la boîte
  const itemsPerPage = 5; // Nombre d'éléments visibles à la fois
  const itemWidth = 250; // Largeur de chaque élément
  const carouselRef = useRef(null);

  // Fonction pour déplacer à gauche
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Déplacer d'un élément à gauche
    }
  };

  // Fonction pour déplacer à droite
  const handleNext = () => {
    if (currentIndex < items.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1); // Déplacer d'un élément à droite
    }
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="flex justify-between items-center w-full mb-4 px-5">
        <h2 className="text-left text-[28px] font-bold">{title}</h2>
        {/* Bouton "Voir tous" */}
        {currentIndex < items.length - itemsPerPage && (
          <button
            className="text-yellow-500 font-bold hover:underline"
            onClick={() => console.log('Voir tous clicked')}
          >
            Voir tous
          </button>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-all duration-300"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`, // Applique le décalage horizontal en fonction de l'indice actuel
          }}
        >
          {/* Conteneur des cartes */}
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0" style={{ width: `${itemWidth}px` }}>
              <CardComponent item={item} size="petit" />
            </div>
          ))}
        </div>

        {/* Bouton gauche */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-full"
          >
            &lt;
          </button>
        )}

        {/* Bouton droit */}
        {currentIndex < items.length - itemsPerPage && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-full"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
