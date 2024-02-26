import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';

const { SpeechRecognition } = Plugins;

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
  recognitionActive: boolean = false;
  transcription: string = '';

  constructor(private _movieService: MovieService, private _loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (!this.isSearching) {
      this._movieService.getTopMovies().subscribe(res => {
        loading.dismiss();
        this.movies = res.results;
      });
    } else {
      this.searchMovies();
    }
  }

  async startSpeechRecognition() {
    try {
      const available = await SpeechRecognition['isAvailable']();
      if (available) {
        await SpeechRecognition['startListening']({
          language: 'en-US',
          showPopup: true,
        });
        SpeechRecognition['addListener']('result', (result: any) => {
          this.searchQuery = result.transcription;
          this.searchMovies();
        });
        this.recognitionActive = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async stopSpeechRecognition() {
    try {
      await SpeechRecognition['stopListening']();
      this.recognitionActive = false;
    } catch (error) {
      console.error(error);
    }
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
  
  toggleRecognition() {
    if (this.recognitionActive) {
      this.stopSpeechRecognition();
    } else {
      this.startSpeechRecognition();
    }
  }
  
}
