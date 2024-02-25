import { Component, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html',
  styleUrls: ['star-rating.scss']
})
export class StarRatingComponent {
  @Input() voteAverage: number = 0; 

  starsArray: string[] = [];

  constructor() {}

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    const maxStars = 5;
    const roundedRating = Math.round(this.voteAverage / 2);
    for (let i = 1; i <= maxStars; i++) {
      if (i <= roundedRating) {
        this.starsArray.push('star');
      } else {
        this.starsArray.push('star-outline');
      }
    }
  }
}
