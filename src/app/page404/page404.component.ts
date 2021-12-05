import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private router : Router, private menuService : MenuService) { }

  ngOnInit(): void {
    setTimeout(()=>this.router.navigate(['/techMap']), 4000)
  }

}
