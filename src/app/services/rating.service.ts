import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rating } from '../rate-me/rating';
import { UrlService } from './url.service';
import { map } from 'rxjs/operators';

export interface ratingInterface{
  name : string;
  point : number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public getRating : Subject<ratingInterface>;
  public responseData : Subject<any>;
  public refreshRatings : Subject<boolean>;
  public refreshSwitch : boolean;


  constructor(private http : HttpClient, private url : UrlService) {
    this.getRating = new Subject();
    this.responseData = new Subject();
    this.refreshRatings = new Subject();
    this.refreshSwitch = false;
   }


  setRating(rating){
    this.getRating.next(rating);
  }

  postRating(rating : Rating){
    this.http.post<Rating>(this.url.getListUrl(), rating, {observe : 'response'}).subscribe(response=>this.responseData.next(response));

  }

  getRatings(){
    return this.http.get(this.url.getListUrl())
    .pipe(
      map(data=>{
        let ratings = [];
        for(let key in data){
          let {comment, design, isDeveloper, nickName, overall, usability, code, isCodeChecked} = data[key];
          let rating = new Rating(nickName, comment, isCodeChecked, isDeveloper, design, usability, code, overall);
          ratings.push(rating);
        }
        return ratings.reverse();
      })
    )
  }

  public triggerRefresh(){
    this.refreshSwitch = !this.refreshSwitch;
    this.refreshRatings.next(this.refreshSwitch);
  }



}
