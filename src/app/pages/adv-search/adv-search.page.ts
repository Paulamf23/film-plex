import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './adv-search.page.html',
  styleUrls: ['./adv-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit {
  genres: any[] = []; //Almacenar los géneros de películas

  constructor(private movieService: MovieService, private navCtrl: NavController) { }

  ngOnInit() {
    this.getGenres(); // Método que se ejecuta al inicializar la página para obtener los géneros
  }

  // Método para obtener los géneros de películas desde el servicio
  getGenres() {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres; // Asigna los géneros obtenidos al arreglo de géneros
    });
  }

  // Método para mostrar las películas por género
  showMoviesByGenre(genreId: number) {
    // Navega hacia la página de películas por género con el ID del género seleccionado
    this.navCtrl.navigateForward(`/genre-movies/${genreId}`);
  }
}
