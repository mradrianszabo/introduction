import { Injectable } from '@angular/core';
import { CONFIG } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  public getListUrl() : string{
    return `${CONFIG.baseUrl}.json`;
  }

  public getObjectUrl(id : string) : string{
    return `${CONFIG.baseUrl}/${id}.json`
  }
}
