import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null; // Objeto para almacenar los detalles de la película
  imageBaseUrl = environment.images; 
  isFavorite = false; // Booleano que indica si la película es favorita para el usuario actual

  constructor(
    private _route: ActivatedRoute, 
    private _movieService: MovieService, 
    private _afAuth: AngularFireAuth 
  ) { }

  ngOnInit() {
    // Obtener el ID de la película de los parámetros de la URL
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      // Obtener los detalles de la película con el ID y suscribirse al resultado
      this._movieService.getMovieDetails(id).subscribe(res => {
        this.movie = res;
      });
      // Verificar si la película es favorita para el usuario actual
      this.checkIfFavorite(id);
    } else {
      console.error("ID is null");
    }
  }

  // Método para agregar una película a la lista de favoritos del usuario
  async addToFavorites(movieId: string) {
    const user = await this._afAuth.currentUser; // Obtener el usuario autenticado
    if (user) {
      const userId = user.uid; // Obtener el ID del usuario
      // Agregar la película a la lista de favoritos en la base de datos de Firebase
      await firebase.database().ref(`favorites/${userId}/${movieId}`).set(true);
      this.isFavorite = true; // Actualizar el estado de favorito
    }
  }

  // Método para eliminar una película de la lista de favoritos del usuario
  async removeFromFavorites(movieId: string) {
    const user = await this._afAuth.currentUser; // Obtener el usuario autenticado
    if (user) {
      const userId = user.uid; // Obtener el ID del usuario
      // Eliminar la película de la lista de favoritos en la base de datos de Firebase
      await firebase.database().ref(`favorites/${userId}/${movieId}`).remove();
      this.isFavorite = false; // Actualizar el estado de favorito
    }
  }

  // Método para verificar si una película es favorita para el usuario actual
  async checkIfFavorite(movieId: string) {
    const user = await this._afAuth.currentUser; // Obtener el usuario autenticado
    if (user) {
      const userId = user.uid; // Obtener el ID del usuario
      // Verificar si la película está en la lista de favoritos del usuario en la base de datos de Firebase
      const snapshot = await firebase.database().ref(`favorites/${userId}/${movieId}`).once('value');
      this.isFavorite = snapshot.exists(); // Actualizar el estado de favorito
    }
  }
}
