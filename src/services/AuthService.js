import api from "../api/axiosConfig";

const API_BASE_URL = "/user/api";
class AuthService {

    register(usuario) {
        return api.post(`${API_BASE_URL}/register`, usuario);
    }

    login(credenciales) {
        return api.post(`${API_BASE_URL}/login`, credenciales);
    }


    saveUser(user) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
    }
    logout() {
        localStorage.removeItem("usuarioLogueado");
        localStorage.removeItem("jwtToken");
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("usuarioLogueado");
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }
}

export default new AuthService();