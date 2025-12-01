import api from "../api/axiosConfig";

const API_BASE_URL = "/purchase/api";

class CompraService {
    createPurchase(compra) {
        return api.post(API_BASE_URL, compra);
    }
    getAllPurchases() {
        return api.get(API_BASE_URL);
    }
}

export default new CompraService();