import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { RATING_ANIMATION } from '../animations/rating-animation';
import { Rating } from '../rate-me/rating';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css'],
  animations: [
    RATING_ANIMATION.fade,
  ]
})
export class RatingListComponent implements OnInit {
  public ratings : Observable<Rating[]>;

  constructor(private ratingService : RatingService) { }

  ngOnInit(): void {
    this.getRatings()
    //setInterval(()=>console.log("ratings",this.ratings), 3000)
  }

  getRatings(){
    this.ratings = this.ratingService.getRatings;
  }


}
