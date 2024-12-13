import { FaRegHeart, FaRegSadTear, FaRegMeh, FaRegGrinStars, FaRegAngry } from "react-icons/fa";

const ReactionModal = ({ isOpen, closeModal, handleReaction, userReaction }) => {
  const getReactionIcon = (reactionType) => {
    switch (reactionType) {
      case "LOVE":
        return <FaRegHeart className={`text-2xl ${userReaction === "LOVE" ? "text-pink-600" : "text-gray-400"}`} />;
      case "SAD":
        return <FaRegSadTear className={`text-2xl ${userReaction === "SAD" ? "text-blue-600" : "text-gray-400"}`} />;
      case "WOW":
        return <FaRegMeh className={`text-2xl ${userReaction === "WOW" ? "text-yellow-600" : "text-gray-400"}`} />;
      case "LIKE":
        return <FaRegGrinStars className={`text-2xl ${userReaction === "LIKE" ? "text-green-600" : "text-gray-400"}`} />;
      case "ANGRY":
        return <FaRegAngry className={`text-2xl ${userReaction === "ANGRY" ? "text-red-600" : "text-gray-400"}`} />;
      default:
        return <FaRegHeart className="text-2xl text-gray-400" />;
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-lg font-semibold text-center mb-4">Choose a Reaction</h2>
          <div className="flex justify-around">
            {["LOVE", "SAD", "WOW", "LIKE", "ANGRY"].map((reactionType) => (
              <button key={reactionType} onClick={() => handleReaction(reactionType)}>
                {getReactionIcon(reactionType)}
              </button>
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
