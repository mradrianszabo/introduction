import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResolutionService } from '../services/resolution.service';
import { Tile } from './tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit, OnDestroy {

  @Input() public tile : Tile;
  @Input() public index : number;
  private resolutionSubscription : Subscription;
  private isSmall : boolean;

  constructor(private resolutionService : ResolutionService) { }

  ngOnInit(): void {
    this.resolutionSubscription = this.resolutionService.innerWidth.subscribe(data=> this.isSmall = data < 1000 ? true : false);
  }
  ngOnDestroy(): void {
    this.resolutionSubscription.unsubscribe();
  }

  callAction(){
    if(this.isSmall && this.tile.mobileAction){
      this.tile.mobileAction();
    }else{
      this.tile.action();
    }
  }

}
