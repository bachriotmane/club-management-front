import React from 'react';
import { FaRegHeart, FaRegSadTear, FaRegMeh, FaRegGrinStars, FaRegAngry } from "react-icons/fa";

const ReactionModal = ({ isOpen, closeModal, handleReaction, userReaction, reactionCounts }) => {

  const getReactionIcon = (reactionType) => {
    switch (reactionType) {
      case "LOVE":
        return <FaRegHeart className={`text-3xl ${userReaction === "LOVE" ? "text-pink-600 scale-125" : "text-gray-400 hover:text-pink-500 transition-transform transform hover:scale-110"}`} />;
      case "SAD":
        return <FaRegSadTear className={`text-3xl ${userReaction === "SAD" ? "text-blue-600 scale-125" : "text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-110"}`} />;
      case "WOW":
        return <FaRegMeh className={`text-3xl ${userReaction === "WOW" ? "text-yellow-600 scale-125" : "text-gray-400 hover:text-yellow-500 transition-transform transform hover:scale-110"}`} />;
      case "LIKE":
        return <FaRegGrinStars className={`text-3xl ${userReaction === "LIKE" ? "text-green-600 scale-125" : "text-gray-400 hover:text-green-500 transition-transform transform hover:scale-110"}`} />;
      case "ANGRY":
        return <FaRegAngry className={`text-3xl ${userReaction === "ANGRY" ? "text-red-600 scale-125" : "text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110"}`} />;
      default:
        return <FaRegHeart className="text-3xl text-gray-400" />;
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-lg font-semibold text-center mb-4">Choose a Reaction</h2>
          <div className="flex justify-around">
            {["LOVE", "SAD", "WOW", "LIKE", "ANGRY"].map((reactionType) => (
              <div key={reactionType} className="flex flex-col items-center">
                <button onClick={() => handleReaction(reactionType)} className="transition-all">
                  {getReactionIcon(reactionType)}
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  {reactionCounts[reactionType.toLowerCase()] || 0}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button onClick={closeModal} className="text-gray-600">Close</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReactionModal;
