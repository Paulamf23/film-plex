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
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userEmail = user.email;
        await this.loadFavoriteMovies();
      }
    });
  }

  async loadFavoriteMovies() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userId = user.uid;
      firebase.database().ref(`favorites/${userId}`).once('value').then(snapshot => {
        const favoriteMoviesObject = snapshot.val();
        if (favoriteMoviesObject) {
          const favoriteMovieIds = Object.keys(favoriteMoviesObject);
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
