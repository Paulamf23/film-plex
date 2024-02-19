import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies = [] as any[];
  imageBaseUrl = environment.images;


  constructor(private _movieService: MovieService, private _loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadMovies();
}

  async loadMovies(){
    const loading = await this._loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this._movieService.getTopMovies().subscribe(res => {
      loading.dismiss();
      this.movies.push(...res.results);
      res.total_results = 10;
      console.log(res);
  })
  }
}
