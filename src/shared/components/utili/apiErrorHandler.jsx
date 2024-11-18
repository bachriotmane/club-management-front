
const apiErrorHandler = (error) => {
    if (error.response) {
      const backendError = error.response.data;
      if (backendError.errorMessage) {
        return backendError.errorMessage;
      } else {
        return "Une erreur s'est produite sur le serveur.";
      }
    } else if (error.request) {
      return "Le serveur n'a pas répondu. Veuillez vérifier votre connexion.";
    } else {
      return "Une erreur inconnue est survenue.";
    }
  };
  
  export default apiErrorHandler;
  