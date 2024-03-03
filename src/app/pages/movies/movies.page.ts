import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core'; 
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import 'firebase/compat/database'; 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [] as any[]; // Array para almacenar las películas
  imageBaseUrl = environment.images; 
  searchQuery: string = ''; 
  isSearching: boolean = false; // Indicador de si se está realizando una búsqueda
  recording = false; // Indicador de si se está grabando audio para búsqueda por voz
  favoriteMovieIds: string[] = []; // Array para almacenar los ID de las películas favoritas

  constructor(
    private _movieService: MovieService, 
    private _loadingCtrl: LoadingController, 
  ) {}

  async ngOnInit() {
    this.loadMovies(); // Cargar las películas al inicializar el componente
    await Plugins['SpeechRecognition']['requestPermission'](); // Solicitar permiso para usar el reconocimiento de voz
  }

  // Método para cargar las películas
  async loadMovies() {
    const loading = await this._loadingCtrl.create({ 
      message: 'Loading...', 
      spinner: 'bubbles', 
    });
    await loading.present(); 

    if (!this.isSearching) {
      try {
        // Obtener las mejores películas usando el servicio MovieService
        const movieResults = await this._movieService.getTopMovies().toPromise();
        if (movieResults && movieResults.results) {
          this.movies = movieResults.results; // Almacenar las películas obtenidas
        } else {
          console.error('No se encontraron resultados de películas.'); 
        }
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        loading.dismiss(); 
      }
    } else {
      this.searchMovies(); // Realizar una búsqueda de películas si hay una consulta de búsqueda
    }
  }

  // Método para iniciar el reconocimiento de voz
  async startRecognition() {
    const { available } = await SpeechRecognition.available(); // Verificar si el reconocimiento de voz está disponible

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

  // Método para detener el reconocimiento de voz
  async stopRecognition() {
    this.recording = false; 
    await SpeechRecognition['stop']();
  }

  // Método para realizar una búsqueda de películas
  searchMovies() {
    this.isSearching = this.searchQuery.trim() !== ''; 

    if (this.isSearching) {
      // Obtener resultados de búsqueda de películas usando el servicio MovieService
      this._movieService.searchMovies(this.searchQuery).subscribe(res => {
        this.movies = res.results; // Almacenar los resultados de la búsqueda
      });
    } else {
      this.loadMovies(); // Cargar las películas si no hay una consulta de búsqueda
    }
  }
}
