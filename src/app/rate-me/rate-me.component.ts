import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { RATING_ANIMATION } from '../animations/rating-animation';
import { ResolutionService } from '../services/resolution.service';
import { NotificationService } from '../services/notification.service';
import { RatingService } from '../services/rating.service';
import { Rating } from './rating';

@Component({
  selector: 'app-rate-me',
  templateUrl: './rate-me.component.html',
  styleUrls: ['./rate-me.component.scss'],
  animations: [
    GENERAL_ANIMATION.fade,
    RATING_ANIMATION.raiseCheckbox
  ]
})
export class RateMeComponent implements OnInit {

  public rating : Rating = new Rating();
  public isMobile : Observable<boolean>;

  constructor(private rateMeService : RatingService, private notification: NotificationService, private resolutionService : ResolutionService) {
    rateMeService.getRating.subscribe(data=>this.rating[data.name] = data.point);
   }

  ngOnInit(): void {
    this.setIsScreenSmall();
  }

  public submit(){
    if(this.validation()){
      this.rateMeService.postRating(this.rating).subscribe(response=>{
        this.notification.handleResponse(response)
        this.rateMeService.refreshRatings()
      });
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

  private setIsScreenSmall(){
    this.isMobile = this.resolutionService.getIsMobile();
  }


}
