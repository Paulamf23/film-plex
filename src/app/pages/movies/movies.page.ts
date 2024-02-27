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
  recording = false;

  constructor(private _movieService: MovieService, private _loadingCtrl: LoadingController) {
    SpeechRecognition['requestPermission']();
  }

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

  async startRecognition(){
    const { available } = await SpeechRecognition['available']();

    if (available){
      this.recording = true;
      SpeechRecognition['start']({
        language: 'en-US',
        popup: false,
        partialResults: true,
      });

      SpeechRecognition['addListener']('result', (data:any)=>{
        console.log('result was fired', data.results);
        if (data.results && data.results.length > 0){
          this.searchQuery = data.results[0].trim();
          this.searchMovies(); 
        }
      });
    }
  }

  async stopRecognition(){
    this.recording  = false;
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
