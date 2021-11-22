import { Component, OnInit } from '@angular/core';
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
  public ratings : Rating[];
  public ratingObservable;
  public refreshSwitch : boolean = false;

  constructor(private ratingService : RatingService) { }

  ngOnInit(): void {
    this.getRatings();
    this.ratingService.refreshRatings.subscribe(data=>{
      if(this.refreshSwitch !== data){
        this.refreshSwitch = data;
        this.getRatings();
      }
    });

  }

  private getRatings(){
    this.ratingObservable = this.ratingService.getRatings();
  }


}
