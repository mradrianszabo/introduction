import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationInterface } from '../notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public getMessage : Subject<NotificationInterface>;

  constructor() {
    this.getMessage = new Subject();
   }

  public error(message : string) : void{
    let notification = {message : message, type : 'error'}
    this.getMessage.next(notification);
  }
  public success(message : string){
    let notification = {message : message, type : 'success'}
    this.getMessage.next(notification)
  }
  public info(message : string){
    let notification = {message : message, type : 'info'}
    this.getMessage.next(notification)
  }

  public handleResponse(response){
    console.log(response)
    if(response.status === 200){
      this.success('Köszönöm az értékelésed, a feltöltés sikeresen megtörtént!')
    }else{
      this.error('A feltöltés sikertelen, váratlan rendszerhiba miatt!')
    }
  }

}
