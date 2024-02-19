export interface BBDD {
    name: string;
    email: string;
    movies: {
        watched: number[]; // Array de IDs de películas vistas
        watchlist: number[]; // Array de IDs de películas por ver
    };
}
