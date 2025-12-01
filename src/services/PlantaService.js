import axios from "axios";
import api from "../api/axiosConfig";

const API_BASE_URL = "/planta/api";
class PlantaService {



    getAllPlanta() {
        return api.get(API_BASE_URL);
    }
    createPlanta(planta) {
        return api.post(API_BASE_URL, planta);
    }

    deletePlanta(id) {
        return api.delete(`${API_BASE_URL}/${id}`);
    }

    getPlantaById(id) {
        return api.get(`${API_BASE_URL}/${id}`);
    }
    addStock(id, stock) {
        return api.put(`${API_BASE_URL}/${id}/${stock}`);
    }

    uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);

        return api.post("/uploads/api", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}

export default new PlantaService();