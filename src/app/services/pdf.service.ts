import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface PdfData{
  name : string;
  url : string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public pdfData : Subject<PdfData>;

  constructor(private http : HttpClient) {
    this.pdfData = new Subject();
   }

  public sendPdf(data : PdfData) : void{
    this.pdfData.next(data);
  }

  public getPdf(url : string) : Observable<any>{
    return this.http.get(url, {responseType : 'blob' as 'json'});
  }
}

