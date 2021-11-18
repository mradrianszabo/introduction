import { Component, Input, OnInit } from '@angular/core';
import { GENERAL_ANIMATION } from 'src/app/animations/general-animation';
import { RATING_ANIMATION } from 'src/app/animations/rating-animation';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating-indicator',
  templateUrl: './rating-indicator.component.html',
  styleUrls: ['./rating-indicator.component.css'],
  animations: [
    RATING_ANIMATION.raiseIndicatorBar,

  ]
})
export class RatingIndicatorComponent implements OnInit {

  public rating : boolean[];
  @Input() public name : string ="";
  @Input() public points : number = 0;

  constructor(private rateMeService : RatingService) {

   }


  ngOnInit(): void {
    this.createRating();
    if(this.points){
      this.injectRating()
    }
  }

  private createRating(){
    this.rating = new Array<boolean>(10);
    for(let i = 0; i< this.rating.length; i++){
      this.rating[i]= false;
    }
  }

  private setRating(indexOfSelected){
    this.rating = this.rating.map((elem, index)=> index <= indexOfSelected ? true : false)

  }

  public sendRating(indexOfSelected){
    if(this.name){
      this.setRating(indexOfSelected);
      let rating = {name : this.name, point : indexOfSelected + 1}
      this.rateMeService.setRating(rating);
    }
  }

  private injectRating(){
    this.setRating(this.points-1);
  }

}
