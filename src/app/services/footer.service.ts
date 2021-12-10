import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http : HttpClient) { }

  public getFooterData() : Observable<any>{
    return this.http.get<Observable<any>>('/assets/data/footer-data.json');
  }
}
