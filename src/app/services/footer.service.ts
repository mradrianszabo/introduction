import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http : HttpClient) { }

  public getFooterData(){
    return this.http.get<Observable<any>>('/assets/data/footer-data.json');
  }
}
