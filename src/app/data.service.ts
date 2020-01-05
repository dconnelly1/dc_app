import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewsApi } from './interfaces/INewsApi';
import { Observable } from 'rxjs'
import { INewsArticle } from './interfaces/INewsArticle';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Capture all the news from the user settings
  // Aggregate the news into one list and sort by date/time

  constructor(private http: HttpClient) { }
  
  getNews(): Observable<INewsApi> {
    
    const httpOptions = {
      headers: { 'x-api-key': '777c3b7a79244c9db8caa1698535fb66' },
      params: { 'country': 'us', 'category': 'technology' }
    }

    try {
      return this.http.get<INewsApi>('https://newsapi.org/v2/top-headlines', httpOptions);     
    }
    catch (err)
    {
      console.dir(err);
    }    
  }

  summarizeArticle(url: string, sentences: number = 5): Observable<INewsArticle> {

    const httpOptions = {
      params: { 'key': 'b406cdae92df6eda9d3cc2dd552fa523', 'url': url, 'sentence': sentences }
    }

    try {
      return this.http.post<INewsArticle>('https://api.meaningcloud.com/summarization-1.0', httpOptions);
    }
    catch (err) {
      console.dir(err);
    }

  }
  

}
