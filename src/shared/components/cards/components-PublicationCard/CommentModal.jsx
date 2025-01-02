import { FaTrashAlt } from "react-icons/fa";

const CommentModal = ({
  isOpen,
  comments,
  commentContent,
  setCommentContent,
  handleAddComment,
  handleDeleteComment,
  closeModal,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg max-w-md w-full">
          <h2 className="text-lg font-semibold text-center mb-4">Comments</h2>

          <ul className="max-h-40 overflow-y-auto">
            {comments && Array.isArray(comments) && comments.map((comment) => (
              <li
                key={comment.id}
                className="flex justify-between items-start py-2 px-3 mb-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200"
              >
                <div>
                  <span className="font-semibold text-gray-800">{comment.firstName} {comment.lastName}</span>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                  <span className="text-xs text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                {comment.isAuthorizedDelete && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"  
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a comment..."
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Add Comment
            </button>
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 transition-all duration-200">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentModal;
