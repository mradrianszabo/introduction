import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  @Input() public src: string;
  public visible: boolean;

  constructor(private menuService : MenuService) {
   }

  ngOnInit(): void {
  }

  closePdf(){
    this.menuService.nextPdf(null);
  }
}
