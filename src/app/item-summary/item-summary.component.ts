import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.css']
})
export class ItemSummaryComponent implements OnInit {
  @Input() public summaryData;

  constructor() { }

  ngOnInit(): void {
  }

}
