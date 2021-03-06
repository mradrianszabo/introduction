import { Component, Input } from '@angular/core';
import { DESCRIPTION_ANIMATION } from '../animations/description-animation';

@Component({
  selector: 'app-percentage-indicator',
  templateUrl: './percentage-indicator.component.html',
  styleUrls: ['./percentage-indicator.component.scss'],
  animations: [
    DESCRIPTION_ANIMATION.percentageChange
  ]
})
export class PercentageIndicatorComponent {

  @Input() public percentage : number;

  constructor() { }

}
