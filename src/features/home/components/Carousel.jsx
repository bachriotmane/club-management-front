import React, { useState, useRef, useEffect } from 'react';

const Carousel = ({ items, CardComponent, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [itemWidth, setItemWidth] = useState(250); 
  const marginRight = 16; 
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(5); 
        setItemWidth(250);   
      } else if (width >= 768) {
        setItemsPerPage(4);
        setItemWidth(200);   
      } else if (width >= 480) {
        setItemsPerPage(3);  
        setItemWidth(150);   
      } else {
        setItemsPerPage(2);  
        setItemWidth(120); 
      }
    };

    updateItemsPerPage();  
    window.addEventListener('resize', updateItemsPerPage);  
    return () => window.removeEventListener('resize', updateItemsPerPage);  
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Vérification 
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className="relative w-full mx-auto">
        <h2 className="text-left text-[28px] font-bold">{title}</h2>
        <div>Aucun élément à afficher.</div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="flex justify-between items-center w-full mb-4 px-5">
        <h2 className="text-left text-[28px] font-bold">{title}</h2>
        <button
          className="text-yellow-500 font-bold hover:underline"
          onClick={() => console.log('Voir tous clicked')}
        >
          Voir tous
        </button>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-all duration-300"
          style={{
            transform: `translateX(-${(currentIndex * (itemWidth + marginRight))}px)`,  
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 mr-4"
              style={{ width: `${itemWidth}px` }} 
            >
              <CardComponent item={item} size="petit" />
            </div>
          ))}
        </div>

        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-full"
          >
            &lt;
          </button>
        )}

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
