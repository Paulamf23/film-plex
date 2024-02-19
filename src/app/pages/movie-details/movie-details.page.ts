import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: any = null;
  imageBaseUrl = environment.images;
  
  constructor(
    private _route: ActivatedRoute, 
    private _movieService: MovieService,
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._movieService.getMovieDetails(id).subscribe(res => {
        console.log(res);
        this.movie = res;
      });
    } else {
      console.error("ID is null");
    }
  }
}
