import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userEmail: string | null;
  favoriteMovies: any[] = [];
  imageBaseUrl = environment.images;

  constructor(
    private afAuth: AngularFireAuth,
    private movieService: MovieService
  ) { 
    this.userEmail = '';
  }

  ngOnInit() {
    // Método del ciclo de vida que se llama cuando el componente se inicializa
    this.afAuth.authState.subscribe(async user => {
      // Verifica si hay un usuario autenticado
      if (user) {
        // Si hay un usuario, obtiene su dirección de correo electrónico
        this.userEmail = user.email;
        // Carga las películas favoritas del usuario
        await this.loadFavoriteMovies();
      }
    });
  }

  // Método para cargar las películas favoritas del usuario
  async loadFavoriteMovies() {
    const user = await this.afAuth.currentUser;
    // Verifica si hay un usuario autenticado
    if (user) {
      const userId = user.uid;
      // Obtiene las películas favoritas del usuario desde la base de datos
      firebase.database().ref(`favorites/${userId}`).once('value').then(snapshot => {
        const favoriteMoviesObject = snapshot.val();
        // Verifica si hay películas favoritas para el usuario
        if (favoriteMoviesObject) {
          // Obtiene los IDs de las películas favoritas
          const favoriteMovieIds = Object.keys(favoriteMoviesObject);
          // Obtiene los detalles de cada película favorita
          const promises = favoriteMovieIds.map(movieId => this.movieService.getMovieDetails(movieId).toPromise());
          Promise.all(promises).then(movies => {
            this.favoriteMovies = movies;
          }).catch(error => {
            console.error("Error loading favorite movies:", error);
          });
        } else {
          this.favoriteMovies = [];
        }
      }).catch(error => {
        console.error("Error loading favorite movies:", error);
      });
    }
  } 
}
