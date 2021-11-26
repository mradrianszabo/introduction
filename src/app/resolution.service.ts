import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  public isScreenSmall : Subject<boolean>;
  public small : boolean;

  constructor() {
    this.isScreenSmall = new Subject();
   }

   sendScreenSize(isScreenSmall : boolean){
    this.isScreenSmall.next(isScreenSmall);
    console.log('servi: ', isScreenSmall)
   }

   setScreenSize(isScreenSmall : boolean){
    this.small = isScreenSmall;
    this.sendScreenSize(this.small)
   }

   getScreenObs(){
     return this.isScreenSmall.asObservable();
   }
}
