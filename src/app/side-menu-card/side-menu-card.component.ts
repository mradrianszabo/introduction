import { Component, Input, OnInit } from '@angular/core';
import { SIDE_CARD_ANIMATION } from '../animations/side-menu-card-animation';
import { SideMenuCard } from './side-menu-card';

@Component({
  selector: 'app-side-menu-card',
  templateUrl: './side-menu-card.component.html',
  styleUrls: ['./side-menu-card.component.scss'],
  animations: [
    SIDE_CARD_ANIMATION.hoverAboutMe,
    SIDE_CARD_ANIMATION.hoverRateMe,
    SIDE_CARD_ANIMATION.hoverSkillMap,
  ]
})
export class SideMenuCardComponent implements OnInit {
  @Input() public card : SideMenuCard;
  public animationStatus : boolean = false;
  public cardAnimationHelper: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.cardAnimationHelper = true;
    setTimeout(()=>this.cardAnimationHelper = false, 500)
  }

}
