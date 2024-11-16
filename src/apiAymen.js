import axios from "axios";

const apiAymen = axios.create({
  baseURL: "http://localhost:8080/demandes", // URL de base de ton backend
});

export default apiAymen;
