import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Observable, fromEvent, Subject } from 'rxjs';
import { map, pluck, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  innerWidth: Observable<number>;
  constructor() {
      let sizeOfWindows = new BehaviorSubject(getWindowSize());

      this.innerWidth = (sizeOfWindows.pipe(map(data=>data.width))).pipe(distinctUntilChanged());

          fromEvent(window, 'resize').pipe(
          map(getWindowSize))
          .subscribe(sizeOfWindows);
  }

}

function getWindowSize() {
  return {
      width: window.innerWidth

  };
  }
