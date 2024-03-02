import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core'; 
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [] as any[];
  imageBaseUrl = environment.images;
  searchQuery: string = '';
  isSearching: boolean = false;
  recording = false;
  favoriteMovieIds: string[] = [];

  constructor(
    private _movieService: MovieService,
    private _loadingCtrl: LoadingController,
    private _afAuth: AngularFireAuth
  ) {}

  async ngOnInit() {
    this.loadMovies();
    await Plugins['SpeechRecognition']['requestPermission']();
  }

  async loadMovies() {
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (!this.isSearching) {
      try {
        const movieResults = await this._movieService.getTopMovies().toPromise();
        if (movieResults && movieResults.results) {
          this.movies = movieResults.results;
        } else {
          console.error('No se encontraron resultados de películas.');
        }
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        loading.dismiss();
      }
    } else {
      this.searchMovies();
    }
  }

  async startRecognition() {
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        language: 'en-US',
        popup: false,
        partialResults: true,
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {
        console.log('partialResults was fired', data.matches);
        if (data.matches && data.matches.length > 0) {
          this.searchQuery = data.matches[0].trim();
          this.searchMovies();
        }
      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition['stop']();
  }

  searchMovies() {
    this.isSearching = this.searchQuery.trim() !== '';

    if (this.isSearching) {
      this._movieService.searchMovies(this.searchQuery).subscribe(res => {
        this.movies = res.results;
      });
    } else {
      this.loadMovies();
    }
  }
}
