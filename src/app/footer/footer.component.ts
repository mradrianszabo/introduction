import { Component, OnInit } from '@angular/core';
import { FooterService } from '../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerData;

  constructor(private footerService : FooterService) { }

  ngOnInit(): void {
    this.getData();
  }

    public action(url : string) : void{
      window.open(url, '_blank');
    }

  private getData() : void{
    this.footerService.getFooterData().subscribe(data=> this.footerData = data);
  }

}
