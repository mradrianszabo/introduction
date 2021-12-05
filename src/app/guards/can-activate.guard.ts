import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CONFIG } from 'src/assets/config';
import { MenuService } from '../services/menu.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  private config = CONFIG;

  constructor(private router : Router, private notificationService : NotificationService, private menuService : MenuService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let propertyName : string = route.data.configProperty;
      if(this.config[propertyName]){
        this.notificationService.error(this.config[propertyName]);
        this.router.navigate(['/']);
        return false;
      }
    return true;
  }

}
