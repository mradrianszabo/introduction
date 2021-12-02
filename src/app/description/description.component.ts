import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DESCRIPTION_ANIMATION } from '../animations/description-animation';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MenuItem } from '../menu-item/menuItem';
import { PdfService } from '../pdf.service';
import { MenuService } from '../services/menu.service';
import { ResolutionService } from '../services/resolution.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  animations: [
    DESCRIPTION_ANIMATION.setNewSelected,
    DESCRIPTION_ANIMATION.removeSelected,
    GENERAL_ANIMATION.fade,
    DESCRIPTION_ANIMATION.percentageChange,
  ]
})
export class DescriptionComponent implements OnInit, OnDestroy{
  public techFamily : MenuItem[];
  public categories : MenuItem[];
  public selected : MenuItem;
  public verticalPositionModifier : number = 0;
  public isSmall : boolean;
  public screenSizeSubscription : Subscription;

  constructor(private routes : ActivatedRoute, private menuService : MenuService, private router: Router, private pdfService: PdfService, private resolution : ResolutionService) {

  }

  async ngOnInit() {
    this.screenSizeSubscription = this.resolution.innerWidth.subscribe(data => this.isSmall = data < 1000 ? true : false)
    await this.menuService.getMenu()

      this.menuService.setMenuAsOpened();
      this.routes.params.subscribe(item => {
        this.setProperties(item);
      })
      this.techFamily = [];
      if(!this.isSmall){
        this.setTechFamily(this.selected);
      }

  }
  ngOnDestroy(): void{
    this.menuService.closeAll(this.selected);
    this.screenSizeSubscription.unsubscribe();
  }

  setProperties(item){
    try{
      //this.techFamily = this.menuService.getParent(item)
      this.selected = this.menuService.getItemByName(item);
      this.categories = this.selected.subItems;
      this.selected.isSelected = true;
    }catch(error){
      this.router.navigate(['/404']);
    }
  }

  setCategory(selectedCategory : MenuItem){
    if(this.selected !==selectedCategory){
      this.selected = selectedCategory;
      this.selected.isSelected = true;
      this.setTechFamily(selectedCategory);
    }

  }

  setTechFamily(selected : MenuItem) : void{
    this.techFamily = [];
    this.addToTechFamily(selected);
  }

  addToTechFamily(selected: MenuItem): void{
    for(let elem of selected.subItems){
      this.techFamily.push(elem);
      if(elem.subItems.length){
        this.addToTechFamily(elem)
      }
    }
  }

  clickCard(item: MenuItem, index: number): void{
    this.verticalPositionModifier = index * 60;
    item.isSelected = true;
    this.selected.isSelected = false;
    setTimeout(()=>this.setSelected(item), 490)
    ;
  }

  setSelected(item : MenuItem){
      this.swapSelected(item);
      this.selected = item;

  }

  swapSelected(item : MenuItem){
    let index = this.techFamily.findIndex(elem => elem === item);
    this.techFamily.splice(index, 1, this.selected);
  }

  openPdf(){
    this.pdfService.sendPdf({name : this.selected.name, url : this.selected.fileUrl});
  }


}
