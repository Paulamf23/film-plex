import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './adv-search.page.html',
  styleUrls: ['./adv-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit {
  genres: any[] = [];

  constructor(private movieService: MovieService, private navCtrl: NavController) { }

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  showMoviesByGenre(genreId: number) {
    this.navCtrl.navigateForward(`/genre-movies/${genreId}`);
  }
}
