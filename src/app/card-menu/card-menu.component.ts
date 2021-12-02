import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SIDE_CARD_ANIMATION } from '../animations/side-menu-card-animation';
import { CardService } from '../services/card.service';
import { ResolutionService } from '../services/resolution.service';
import { SideMenuCard } from '../side-menu-card/side-menu-card';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css'],
  animations: [
    SIDE_CARD_ANIMATION.cardContainer
  ]
})
export class CardMenuComponent implements OnInit {
  public menuCards : SideMenuCard[];
  public resolution : Observable<number>;

  constructor(private cardService : CardService, private resolutionService : ResolutionService) { }

  ngOnInit(): void {
    this.menuCards = this.cardService.getCards();
    this.resolution = this.resolutionService.innerWidth;
  }

}
