import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { RATING_ANIMATION } from '../animations/rating-animation';
import { ResolutionService } from '../resolution.service';
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
export class RateMeComponent implements OnInit, OnDestroy {

  public rating : Rating = new Rating();
  public isScreenSmall : boolean;
  public resolutionSubscription : Subscription;
  public screenObs : Observable<boolean>;

  constructor(private rateMeService : RatingService, private notification: NotificationService, private router : Router, private resolutionService : ResolutionService) {
    rateMeService.getRating.subscribe(data=>this.rating[data.name] = data.point);
   }

  ngOnInit(): void {
    this.setIsScreenSmall();
  }
  ngOnDestroy(): void {
    this.resolutionSubscription.unsubscribe();
  }

  public submit(form){
    if(this.validation()){
      this.rateMeService.postRating(this.rating).subscribe(response=>this.notification.handleResponse(response));
      this.router.navigate(['/techMap']);
      setTimeout(()=>this.rateMeService.refreshRatings(),1000);
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
    //this.resolutionSubscription = this.resolutionService.isScreenSmall.subscribe(data=>{this.isScreenSmall = data; console.log('data a subba: ', data)})
    this.resolutionSubscription = this.resolutionService.innerWidth.subscribe(data=>console.log(this.isScreenSmall = data > 1000 ? false : true));
  }


}
