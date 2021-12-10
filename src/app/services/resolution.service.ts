import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

function isScreenMobile() {
  return window.innerWidth < 1000 ? true : false;
  }

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  private isMobile: Observable<boolean>;

  constructor() {
    let sizeOfWindow = new BehaviorSubject(isScreenMobile());
    this.isMobile = sizeOfWindow.pipe(distinctUntilChanged());
    fromEvent(window, 'resize').pipe(map(isScreenMobile)).subscribe(sizeOfWindow);
  }

  getIsMobile() : Observable<boolean>{
    return this.isMobile;
  }

}
