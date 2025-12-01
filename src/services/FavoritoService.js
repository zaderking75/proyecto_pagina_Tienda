class FavoritoService {


    getFavoritosIDs() {
        return JSON.parse(localStorage.getItem("favoritos")) || [];
    }


    toggleFavorito(id) {
        let favoritos = this.getFavoritosIDs();

        if (favoritos.includes(id)) {

            favoritos = favoritos.filter(favId => favId !== id);
        } else {

            favoritos.push(id);
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        return favoritos;
    }


    esFavorito(id) {
        const favoritos = this.getFavoritosIDs();
        return favoritos.includes(id);
    }
}

export default new FavoritoService();