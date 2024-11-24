import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicationById, updatePublication } from "../../repositories/publications.repository.js";
import { saveImage, getImage } from "../../repositories/image.repository.js";
import axiosInstance from "../../auth/axios.js";
import { getClubsForUser } from "../../repositories/clubs.repository.js";
import { getUser } from "../../auth/auth.js";

const UpdatePublication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
        clubId: "",
        image: null,
    });
    const [existingImage, setExistingImage] = useState(null);
    const [error, setError] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clubsList, setClubsList] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);

    const fetchPublication = async () => {
        try {
            setIsLoading(true);
            const resp = await getPublicationById(id);
            const publication = resp.data;

            setFormData({
                title: publication.title,
                description: publication.description,
                visibility: publication.isPublic ? "public" : "private",
                clubId: publication.clubId,
                image: null,
            });

            if (publication.imageId) {
                const imageResp = await getImage(publication.imageId);
                setExistingImage(imageResp);
            }
        } catch (err) {
            setError(err.response?.data?.errorMessage || "Échec du chargement de la publication.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClubs = async () => {
        try {
            setIsLoading(true);
            const resp = await getClubsForUser(getUser().id);
            setClubsList(resp.data);
        } catch (err) {
            setError(err.message || "Échec du chargement des clubs.");
        } finally {
            setIsLoading(false);
        }
    };

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
            setError("Tous les champs sont obligatoires.");
            return;
        }

        setError(undefined);
        setIsSubmitting(true);

        try {
            let imageId = existingImage?.id;

            if (formData.image) {
                const imageResponse = await saveImage(formData.image);
                imageId = imageResponse.data;
            }
            const updatedPublication = {
                title: formData.title,
                description: formData.description,
                clubId: formData.clubId,
                isPublic: formData.visibility === "public",
                imageId: deleteImage ? null : imageId,
            };

            await updatePublication(id, updatedPublication);

            if (formData.image && imageId) {
                await axiosInstance.post(`/publications/${id}/image/${imageId}`);
            }

            navigate("/publications");
        } catch (err) {
            setError(err.response?.data?.errorMessage || "Échec de la mise à jour de la publication.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchPublication().then(() => fetchClubs());
    }, [id]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Modifier la Publication</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Titre
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="" disabled>
                            Sélectionnez un club
                        </option>
                        {clubsList.map((club) => (
                            <option key={club.uuid} value={club.uuid}>
                                {club.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                        Visibilité
                    </label>
                    <div className="mt-2 flex space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="public"
                                checked={formData.visibility === "public"}
                                onChange={handleInputChange}
                            />
                            Public
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value="private"
                                checked={formData.visibility === "private"}
                                onChange={handleInputChange}
                            />
                            Privé
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    {existingImage && (
                        <div className="mb-2">
                            <img
                                src={existingImage}
                                alt="Existante"
                                className="w-full h-auto rounded-md mb-2"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteImage(true);
                                    setExistingImage(null);
                                }}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Supprimer l'image
                            </button>
                        </div>
                    )}
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white rounded-lg ${
                        isSubmitting ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Mise à jour..." : "Mettre à jour la publication"}
                </button>
            </form>
        </div>
    );
};

export default UpdatePublication;
