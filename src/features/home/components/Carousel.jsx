import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Carousel = ({ items, CardComponent, title }) => {
  const [startIndex, setStartIndex] = useState(0);

  const scrollLeftHandler = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 5);
    }
  };

  const scrollRightHandler = () => {
    if (startIndex < items.length - 5) {
      setStartIndex(startIndex + 5);
    }
  };

  const scrollToListHandler = () => {
    setStartIndex(0); 
  };

  const itemsToShow = items.slice(startIndex, startIndex + 5);

  return (
    <div className="relative w-full max-w-full  mmx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left ml-[150px] text-[28px] font-bold">{title}</h2>
        
        <button 
          onClick={scrollToListHandler}
          className="text-yellow-500 mr-20 hover:text-yellow-600 transition-all text-[25px] font-semibold"
        >
          Voir tous
        </button>
      </div>
      
      <div className="flex items-center relative">
        <button
          onClick={scrollLeftHandler}
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all absolute left-0 z-10"
        >
          <FaArrowLeft />
        </button>

        <div className="flex overflow-hidden space-x-2 px-4 scrollbar-hidden ml-12">
          {itemsToShow.map((item) => (
            <div key={item.id} className="px-4 ml-11">
              <CardComponent item={item} size="petit" />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRightHandler}
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all absolute right-0 z-10"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
