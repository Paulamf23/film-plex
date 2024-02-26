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

  movies: any[] = [];
  genreId: number | undefined;
  imageBaseUrl = environment.images;

  constructor(private _movieService: MovieService, private _navCtrl: NavController, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.genreId = params['genreId'];
      if (this.genreId !== undefined) {
        this.getMoviesByGenre(this.genreId);
      }
    });
  }

  getMoviesByGenre(genreId: number) {
    this._movieService.getMoviesByGenre(genreId).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  goBack() {
    this._navCtrl.navigateBack('/adv-search');
  }

}
