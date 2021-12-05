import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerData;

  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.footerData = {
      "contact" : [
         {
          "name" : "Phone",
          "value" : "06701234567"
        },
         {
          "name" : "Email",
          "value" : "mradrianszabo@gmail.com"
        },
        {
          "name" : "Website",
          "value" : "introduction-dc0d2.web.app"
        }
      ],
      "social" : [
        {
          "link" : "Github",
          "icon" : "/assets/images/githubLogo2.png",
          "url" : "//github.com"
        },
        {
          "link" : "Facebook",
          "icon" : "/assets/images/facebookLogo2.png",
          "url" : "//facebook.com"
        },
        {
          "link" : "LinkedIn",
          "icon" : "/assets/images/linkedinLogo2.png",
          "url" : "//linkedin.com"
        }
      ],
      "qr" : "/assets/images/qr.png"
    }
  }

  action(url){
    window.open(url, '_blank');
  }

}
