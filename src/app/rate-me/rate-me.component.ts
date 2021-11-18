import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { RATING_ANIMATION } from '../animations/rating-animation';
import { NotificationService } from '../services/notification.service';
import { RatingService } from '../services/rating.service';
import { Rating } from './rating';

@Component({
  selector: 'app-rate-me',
  templateUrl: './rate-me.component.html',
  styleUrls: ['./rate-me.component.css'],
  animations: [
    GENERAL_ANIMATION.fade,
    RATING_ANIMATION.raiseCheckbox
  ]
})
export class RateMeComponent implements OnInit {

  public rating : Rating = new Rating();

  constructor(private rateMeService : RatingService, private notification: NotificationService, private router : Router) {
    rateMeService.getRating.subscribe(data=>this.rating[data.name] = data.point);
   }

  ngOnInit(): void {
  }

  public submit(form){
    if(this.validation()){
      this.rateMeService.postRating(this.rating);
      this.rateMeService.responseData.subscribe(data=> this.notification.handleResponse(data));
      this.router.navigate(['techmap']);
      setTimeout(()=>this.rateMeService.triggerRefresh(),1000);
    }
    else{
      this.notification.error('Legalább a pontozós részeket töltsd ki, kérlek!')
    }
  }

  private validation(){
    if(this.rating.design && this.rating.usability && this.rating.overall){
      return true;
    }
    return false;
  }



}
