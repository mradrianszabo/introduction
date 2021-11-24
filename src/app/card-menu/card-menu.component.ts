import { Component, OnInit } from '@angular/core';
import { SIDE_CARD_ANIMATION } from '../animations/side-menu-card-animation';
import { CardService } from '../services/card.service';
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

  constructor(private cardService : CardService) { }

  ngOnInit(): void {
    this.menuCards = this.cardService.getCards();
  }

}
