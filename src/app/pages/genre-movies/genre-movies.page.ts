import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-movies',
  templateUrl: './genre-movies.page.html',
  styleUrls: ['./genre-movies.page.scss'],
})
export class GenreMoviesPage implements OnInit {

  movies: any[] = []; // Almacenar las películas del género
  genreId: number | undefined; // Identificador del género seleccionado
  imageBaseUrl = environment.images; // URL base para las imágenes
  currentPage = 1; // Página actual de resultados

  constructor(private _movieService: MovieService, private _navCtrl: NavController, private _route: ActivatedRoute) { }

  ngOnInit() {
    // Suscripción a los cambios en los parámetros de la ruta
    this._route.params.subscribe(params => {
      // Obtener el ID del género de los parámetros de la ruta
      this.genreId = params['genreId'];
      if (this.genreId !== undefined) {
        // Obtener las películas del género al inicializar el componente
        this.getMoviesByGenre(this.genreId);
      }
    });
  }

  // Método para obtener las películas por género
  getMoviesByGenre(genreId: number) {
    this._movieService.getMoviesByGenre(genreId).subscribe((data: any) => {
      // Agregar las películas obtenidas al arreglo existente
      this.movies = [...this.movies, ...data.results];
    });
  }
  

  // Método para cargar más películas cuando se desplaza hacia abajo
  loadMore(event: any) {
    if (this.genreId !== undefined) {
      this.currentPage++;
      this.getMoviesByGenre(this.genreId);
      event.target.complete();
    }
  }
  

  // Método para navegar de regreso a la página de búsqueda avanzada
  goBack() {
    this._navCtrl.navigateBack('/adv-search');
  }

}
