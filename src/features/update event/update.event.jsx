import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../../repositories/evenements.repository.js";
import { saveImage, getImage } from "../../repositories/image.repository.js";
import Swal from "sweetalert2";

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: "",
        description: "",
        date: "",
        location: "",
        instagram: "",
        image: null,
    });
    const [existingImage, setExistingImage] = useState(null);
    const [error, setError] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteImage, setDeleteImage] = useState(false);

    const fetchEvent = async () => {
        try {
            setIsLoading(true);
            const resp = await getEventById(id);
            const event = resp.data;

            const formattedDate = event.date
                ? new Date(event.date).toISOString().slice(0, 16) // Format to 'YYYY-MM-DDTHH:mm'
                : "";

            setFormData({
                nom: event.nom,
                description: event.description,
                date: formattedDate,
                location: event.location,
                instagram: event.instagram,
                image: null, // New image (if any) will be handled separately
            });

            if (event.imageId) {
                const imageResp = await getImage(event.imageId);
                setExistingImage(imageResp);
            }
        } catch (err) {
            setError(err.response?.data?.errorMessage || "Échec du chargement de l'événement.");
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

        if (!formData.nom || !formData.description) {
            setError("Tous les champs obligatoires doivent être remplis.");
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

            const updatedEvent = {
                nom: formData.nom,
                id : id,
                description: formData.description,
                date: formData.date,
                location: formData.location,
                instagram: formData.instagram,
                imageId: deleteImage ? null : imageId,
            };

            await updateEvent(id, updatedEvent);

            Swal.fire("Succès !", "Événement mis à jour avec succès.", "success").then(() =>
                navigate("/events")
            );
        } catch (err) {
            console.log("hna")
            setError(err.response?.data?.errorMessage || "Échec de la mise à jour de l'événement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Mettre à jour l'événement</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                        Nom de l'événement
                    </label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
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
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Lieu
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                        Instagram
                    </label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Télécharger une nouvelle image
                    </label>
                    {existingImage && (
                        <>
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteImage(true);
                                    setExistingImage(null)
                                }}
                                className="text-red-600 hover:text-red-800"
                            >
                                Supprimer l'image existante
                            </button>
                            <img
                                src={existingImage}
                                alt="Événement existant"
                                className="w-full h-auto mb-2 rounded-md"
                            /></>

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
                        isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                </button>
            </form>
        </div>
    );
};

export default UpdateEvent;
