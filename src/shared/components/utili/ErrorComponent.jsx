const ErrorMessage = ({ title, description }) => {
    return (
        <div className="bg-red-100 flex items-center flex-col border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{title}</strong>
            <span className="block sm:inline"> {description}</span>
        </div>
    );
};

export default ErrorMessage;
