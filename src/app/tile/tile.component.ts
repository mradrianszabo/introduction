import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResolutionService } from '../services/resolution.service';
import { Tile } from './tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnDestroy {

  @Input() public tile : Tile;
  @Input() public index : number;
  private resolutionSubscription : Subscription;
  private isMobile : boolean;

  constructor(private resolutionService : ResolutionService) { }

  ngOnInit(): void {
    this.resolutionSubscription = this.resolutionService.getIsMobile().subscribe(data=> this.isMobile = data);
  }
  ngOnDestroy(): void {
    this.resolutionSubscription.unsubscribe();
  }

  callAction(){
    if(this.isMobile && this.tile.mobileAction){
      this.tile.mobileAction();
    }else{
      this.tile.action();
    }
  }

}
