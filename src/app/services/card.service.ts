import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuCard } from '../side-menu-card/side-menu-card';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private menuService : MenuService, private router: Router) { }

  public getCards(){
    let cards = [];
    cards.push(
      new SideMenuCard(
        'Skill map',
        'skillMap',
        ()=>{this.menuService.setMenuAsOpened()}
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
          this.router.navigate(['/rateMe'])}
      )
    )
    return cards;
  }

}


