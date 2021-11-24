import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
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
          "icon" : "/assets/images/githubLogo.png"
        },
        {
          "link" : "Facebook",
          "icon" : "/assets/images/facebookLogo.png"
        },
        {
          "link" : "LinkedIn",
          "icon" : "/assets/images/linkedinLogo.png"
        }
      ],
      "qr" : "/assets/images/qr.png"
    }
  }

}
