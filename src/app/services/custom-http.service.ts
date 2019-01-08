import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  private URL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  post(link : string, body : any, options?: any)
  {
    return this.httpClient.post(this.getUrl(link), body, options);
  }

  get(link: string, options?: any)
  {
    return this.httpClient.get(this.getUrl(link), options);
  }
  
  delete(link: string, options?: any) {
    return this.httpClient.delete(this.getUrl(link), options);
  }

  private getUrl(link: string) {
    if (link.indexOf('/') === 0) {
      return this.URL + link;
    }
    return this.URL + '/' + link;
  }
}
