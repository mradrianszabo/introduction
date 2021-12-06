import { Component, OnInit } from '@angular/core';
import { TileService } from '../services/tile.service';
import { Tile } from '../tile/tile';

@Component({
  selector: 'app-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss']
})
export class TileListComponent implements OnInit {

  public tileList : Tile[];

  constructor(private tileService : TileService) { }

  ngOnInit(): void {
    this.setTileList();
  }

  setTileList(){
    this.tileService.getTileList().subscribe(data=> this.tileList = data);
  }

}
