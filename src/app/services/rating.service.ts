import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  public getRatings : Subject<Rating[]>;


  constructor(private http : HttpClient, private url : UrlService) {
    this.getRating = new Subject();
    this.getRatings = new Subject();
    this.refreshRatings();
   }


  setRatingValue(rating : ratingInterface) : void{
    this.getRating.next(rating);
  }

  postRating(rating : Rating) : Observable<HttpResponse<Rating>>{
    let response = this.http.post<Rating>(this.url.getListUrl(), rating, {observe : 'response'});
    return response;

  }

  fetchRatings() : Observable<Rating[]>{
    return this.http.get<ratingInterface>(this.url.getListUrl())
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

  refreshRatings() : void{
    this.fetchRatings().subscribe(ratings=>this.getRatings.next(ratings));
  }




}
