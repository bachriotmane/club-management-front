import { getClubById} from "../../../repositories/clubs.repository";
import { editImage, getImage } from "../../../repositories/image.repository";
import apiErrorHandler from "../../../shared/components/utili/apiErrorHandler";

export const fetchClubData = async (uuid, setClub, setClubFormData, setLogoUrl, setStudentsImages, setLoading, setError) => {
  try {
    const data = await getClubById(uuid);
    if (data.errorCode) {
      throw new Error(data.errorMessage);
    }
    setClub(data.data);
    setClubFormData(data.data);

    if (data.data.logo) {
      const imageUrl = await getImage(data.data.logo);
      setLogoUrl(imageUrl);
    }

    const studentImages = await Promise.all(
      data.data.profilsDetailsDto.map(async (student) => {
        if (student.imgProfile) {
          return await getImage(student.imgProfile);
        }
        return "/default-profile.png";
      })
    );
    setStudentsImages(studentImages);
  } catch (err) {
    const errorMessage = apiErrorHandler(err);
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};
export const SubmitImageEditService = async (selectedImage, club, setLogoUrl, setIsEditImageModalOpen, setSelectedImage, setStatusMessage, setErrorValidation) => {
    if (!selectedImage || !club.uuid) {
      setErrorValidation("Aucune image ou ID de club fourni.");
      return;
    }
  
    try {
      const dto = {
        uuidImage: selectedImage.uuid,  
        typeObjet: "club",             
        uuidObjet: club.uuid           
      };
  
      const imageUrl = await editImage(dto, selectedImage);  
      setLogoUrl(imageUrl);
      setIsEditImageModalOpen(false);
      setSelectedImage(null);
      setStatusMessage("Club modifié avec succès !");
      setErrorValidation([]);
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      setErrorValidation([errorMessage]);  
    }
  };

