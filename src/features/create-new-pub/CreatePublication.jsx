import { useEffect, useState } from "react";
import { getClubsForUser } from "../../repositories/clubs.repository.js";
import { getUser } from "../../auth/auth.js";
import { saveImage } from "../../repositories/image.repository.js";
import { createNewPublication } from "../../repositories/publications.repository.js";
import axiosInstance from "../../auth/axios.js";
import { useNavigate } from "react-router-dom";

const CreatePublication = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
        clubId: "",
        image: null
    });

    const [error, setError] = useState(undefined);
    const [clubsList, setClubsList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchClubs = async () => {
        try {
            setIsLoading(true);
            const resp = await getClubsForUser(getUser().id);
            setClubsList(resp.data);
        } catch (err) {
            setError(err.message || "Failed to load clubs.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.clubId) {
            setError("All fields are required.");
            return;
        }

        setError(undefined); // Reset error
        setIsSubmitting(true);

        try {
            let imageId = null;

            // Step 1: Upload the image if provided
            if (formData.image) {
                const imageResponse = await saveImage(formData.image);
                imageId = imageResponse.data; // Assuming the payload contains the image ID
            }

            // Step 2: Create the publication
            const publicationBody = {
                title: formData.title,
                description: formData.description,
                clubId: formData.clubId,
                isPublic: formData.visibility === "public"
            };
            const publication = await createNewPublication(publicationBody);

            // Step 3: Associate the image with the publication (if uploaded)
            if (imageId) {
                await axiosInstance.post(
                    `/publications/${publication.data.id}/image/${imageId}`
                );
            }

            setIsSubmitted(true);
            setTimeout(() => navigate("/publications"), 2000);
        } catch (err) {
            setError(err.response?.data?.errorMessage || "Failed to create publication.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Loading clubs...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create New Publication</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {isSubmitted && (
                <p className="text-green-500 text-sm mb-4">
                    Publication created successfully! Redirecting...
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter the title"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter the description"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="clubId" className="block text-sm font-medium text-gray-700">
                        Club
                    </label>
                    <select
                        id="clubId"
                        name="clubId"
                        value={formData.clubId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        required
                    >
                        <option value="" disabled>
                            Select a club
                        </option>
                        {clubsList.map((club) => (
                            <option key={club.uuid} value={club.uuid}>
                                {club.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Visibility
                    </label>
                    <div className="mt-2 flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="visibility"
                                value="public"
                                checked={formData.visibility === "public"}
                                onChange={handleInputChange}
                                className="form-radio text-orange-600"
                            />
                            <span className="ml-2 text-gray-700">Public</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="visibility"
                                value="private"
                                checked={formData.visibility === "private"}
                                onChange={handleInputChange}
                                className="form-radio text-orange-600"
                            />
                            <span className="ml-2 text-gray-700">Private</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image (Optional)
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Create Publication"}
                </button>
            </form>
        </div>
    );
};

export default CreatePublication;
