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
  movie: any = null;
  imageBaseUrl = environment.images;
  isFavorite = false;

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService,
    private _afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._movieService.getMovieDetails(id).subscribe(res => {
        this.movie = res;
      });
      this.checkIfFavorite(id);
    } else {
      console.error("ID is null");
    }
  }

  async addToFavorites(movieId: string) {
    const user = await this._afAuth.currentUser;
    if (user) {
      const userId = user.uid;
      await firebase.database().ref(`favorites/${userId}/${movieId}`).set(true);
      this.isFavorite = true;
    }
  }

  async removeFromFavorites(movieId: string) {
    const user = await this._afAuth.currentUser;
    if (user) {
      const userId = user.uid;
      await firebase.database().ref(`favorites/${userId}/${movieId}`).remove();
      this.isFavorite = false;
    }
  }

  async checkIfFavorite(movieId: string) {
    const user = await this._afAuth.currentUser;
    if (user) {
      const userId = user.uid;
      const snapshot = await firebase.database().ref(`favorites/${userId}/${movieId}`).once('value');
      this.isFavorite = snapshot.exists();
    }
  }
}
