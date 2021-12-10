import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.scss']
})
export class ItemSummaryComponent{
  @Input() public summaryData;

  constructor() { }
}
