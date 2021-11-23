import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { NotificationService } from '../services/notification.service';

export interface NotificationInterface{
  message : string;
  type: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    GENERAL_ANIMATION.fade,
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notification : NotificationInterface;
  public visible : boolean= false;
  public notificationSubscription : Subscription;

  constructor(private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.subscribeMessage();
  }

  ngOnDestroy(): void{
    this.notificationSubscription.unsubscribe();
  }

  private subscribeMessage(){
    this.notificationSubscription = this.notificationService.getMessage.subscribe(data=>{
      this.notification = data;
      this.visible = true;
      setTimeout(()=>this.visible = false, 4000);
    })
  }

  setImage(){
    let error = '/assets/images/sadLogo.png';
    let success = '/assets/images/happyLogo.png';
    let info = '/assets/images/infoLogo.png';
    return this.notification.type === 'error' ? error : this.notification.type === 'success' ? success : info;
  }

}
