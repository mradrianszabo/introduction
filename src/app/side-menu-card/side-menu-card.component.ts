import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { SIDE_CARD_ANIMATION } from '../animations/side-menu-card-animation';
import { MenuService } from '../services/menu.service';
import { SideMenuCard } from './side-menu-card';

@Component({
  selector: 'app-side-menu-card',
  templateUrl: './side-menu-card.component.html',
  styleUrls: ['./side-menu-card.component.css'],
  animations: [
    SIDE_CARD_ANIMATION.hoverAboutMe,
    SIDE_CARD_ANIMATION.hoverRateMe,
    SIDE_CARD_ANIMATION.hoverSkillMap,
  ]
})
export class SideMenuCardComponent implements OnInit, OnDestroy {
  @Input() public card : SideMenuCard;
  public animationStatus : boolean = false;
  public cardAnimationHelper: boolean;

  constructor(private menuService : MenuService) {
  }

  ngOnInit(): void {
    this.cardAnimationHelper = true;
    setTimeout(()=>this.cardAnimationHelper = false, 500)
  }
  ngOnDestroy(): void{
    console.log('destroyhelper: ', this.cardAnimationHelper)
  }

  resetAnimation(){
    this.animationStatus = false;
  }
  public swichHelper(){
    this.cardAnimationHelper = false;
  }

  callAction(){
    this.card.action()
  }

}
