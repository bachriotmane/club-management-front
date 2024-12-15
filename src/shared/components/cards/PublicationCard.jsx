import React, { useState, useEffect } from "react";
import { getReactionsStatus, addReaction, deleteReaction } from "../../../repositories/reactions.repository.js";
import { getCommentsByPublication, addComment, deleteComment } from "../../../repositories/comments.repository";
import { useNavigate } from "react-router-dom";
import ReactionModal from "./components-PublicationCard/ReactionModal.jsx";
import CommentModal from "./components-PublicationCard/CommentModal";
import { FaComment, FaShareAlt, FaCalendarAlt, FaRegClock, FaRegHeart, FaRegSadTear, FaRegMeh, FaRegGrinStars, FaRegAngry } from "react-icons/fa";
import ConfirmationModal from "./components-PublicationCard/ConfirmationModal";

const getFormattedTime = (date) => {
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const PublicationCard = ({ item, image, isClickable = false }) => {
  const [userReaction, setUserReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({
    totalReactions: 0,
    love: 0,
    like: 0,
    wow: 0,
    sad: 0,
    angry: 0
  });
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [action, setAction] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  const fetchReactionStatus = () => {
    getReactionsStatus(item.id).then(response => {
      setReactionCounts(response.data.reactionCounts);
      setUserReaction(response.data.userReaction);
    });
  };

  const fetchComments = () => {
    getCommentsByPublication(item.id).then(response => {
      setComments(response.data);
      setCommentCount(response.data.length);
    });
  };

  const handleReaction = (reactionType) => {
    if (userReaction === reactionType) {
      deleteReaction(item.id).then(() => {
        setUserReaction(null);
        fetchReactionStatus();
        closeModal();
      });
    } else {
      const reactionRequest = { publicationId: item.id, type: reactionType };
      addReaction(reactionRequest).then(() => {
        setUserReaction(reactionType);
        fetchReactionStatus();
        closeModal();
      });
    }
  };

  const handleAddComment = () => {
    if (commentContent.trim()) {
      addComment({ publicationId: item.id, content: commentContent }).then(() => {
        setCommentContent("");
        fetchComments();
      });
    }
  };

  const handleDeleteComment = (commentId) => {
    setAction('deleteComment');
    setCommentId(commentId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (action === 'deleteComment' && commentId) {
      deleteComment(commentId).then(() => {
        fetchComments();
      });
    } else if (action === 'deleteReaction') {
      deleteReaction(item.id).then(() => {
        setUserReaction(null);
        fetchReactionStatus();
      });
    }
    setIsConfirmModalOpen(false);
  };

  const handleCancelAction = () => {
    setIsConfirmModalOpen(false);
    setAction(null);
    setCommentId(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCommentModal = () => {
    setIsCommentModalOpen(true);
    fetchComments();
  };
  const closeCommentModal = () => setIsCommentModalOpen(false);

  const handleNavigation = () => navigate(`/publication/${item.id}`);

  useEffect(() => {
    fetchReactionStatus();
    fetchComments();
  }, [item.id]);

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
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 mx-auto w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div onClick={handleNavigation} className="cursor-pointer">
        <img
          src={image || "default-image.jpg"}
          alt={item.title}
          className="object-contain w-full h-48 rounded-md" 
        />
      </div>
      <h3 className="mt-4 text-sm sm:text-lg md:text-xl font-semibold text-gray-800 truncate cursor-pointer" onClick={handleNavigation}>
        {item.title}
      </h3>
      <div className="mt-2">
  <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3 h-[4.5rem]">
    {item.description ? item.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."}
  </p>
</div>

      <div className="mt-4 space-y-2 text-gray-500">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500 hover:text-blue-700 text-xs sm:text-sm md:text-base"/>
          <span className="text-xs sm:text-sm">{new Date(item.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <FaRegClock className="mr-2 text-yellow-500 hover:text-yellow-700 text-xs sm:text-sm md:text-base"/>
          <span className="text-xs sm:text-sm">Publié à: {getFormattedTime(item.date)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button onClick={isClickable ? openModal : null} className="flex items-center hover:text-pink-600">
            {getReactionIcon(userReaction)}
            <span className="ml-2 text-xs sm:text-sm text-gray-600">{reactionCounts.totalReactions}</span>
          </button>
          <button onClick={isClickable ? openCommentModal : null} className="text-gray-600 hover:text-blue-500 flex items-center">
            <FaComment className="text-sm sm:text-base md:text-lg text-blue-500 hover:text-blue-700"/>
            <span className="ml-2 text-xs sm:text-sm text-gray-600">{commentCount}</span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-green-500 ml-auto">
          <FaShareAlt className="text-sm sm:text-base md:text-lg text-green-500 hover:text-green-700"/>
        </button>
      </div>

      <ReactionModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleReaction={handleReaction}
        userReaction={userReaction}
        reactionCounts={reactionCounts}
      />

      <CommentModal
        isOpen={isCommentModalOpen}
        comments={comments}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        closeModal={closeCommentModal}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message="Êtes-vous sûr de vouloir effectuer cette action ?"
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
};

export default PublicationCard;
