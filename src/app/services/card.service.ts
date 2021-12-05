import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideMenuCard } from '../side-menu-card/side-menu-card';
import { MenuService } from './menu.service';
import { ResolutionService } from './resolution.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public isMobile : boolean;

  constructor(private menuService : MenuService, private router: Router, private resolutionService : ResolutionService) {
    this.resolutionService.getIsMobile().subscribe(data=>this.isMobile = data);
   }

  public getCards(){
    let cards = [];
    cards.push(
      new SideMenuCard(
        'Skill map',
        'skillMap',
        ()=>{
          if(this.isMobile){
            this.menuService.emitMenuStatus(true);
            setTimeout(()=>this.router.navigate(['/description/tech']),500)
          }else{
            this.menuService.setMenuAsOpened();
          }
        }
        ),
      new SideMenuCard(
        'About me',
        'aboutMe',
        ()=>{
          this.menuService.emitMenuStatus(true);
          setTimeout(()=>this.router.navigate(['/description/personal']),500)
        }
      ),
      new SideMenuCard(
        'Rate me',
        'rateMe',
        ()=>{
          this.menuService.emitMenuStatus(true);
          setTimeout(()=>this.router.navigate(['/rateMe']), 500)
        }
      )
    )
    return cards;
  }

}


