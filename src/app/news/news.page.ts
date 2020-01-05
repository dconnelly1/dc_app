import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { INewsApi, Article } from '../interfaces/INewsApi';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router'


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    private data: DataService, 
    public afAuth: AngularFireAuth,
    public router: Router
    ) { }

  newsArticles: INewsApi;

  async ngOnInit() {

    // subscribe to the auth state to get auth info
    this.afAuth.authState.subscribe(r => {

      // if the object exists and the user has an ID we consider them logged in
      if (r && r.uid) {
        console.log("User is logged in");
        
        // Refresh the news 
        this.data.getNews().subscribe(data => this.newsArticles = data);
     
      // User is not logged in  
      } else {
        console.log("User is not logged in");
      }
    });
  }

  getDetails(article)
  {
    // Navigate to the news article page with the article object passed through
    this.router.navigate(['/tabs/newsarticle', { 'title': article.title, 'img': article.urlToImage, 'url': article.url, 'content': article.content, 'description': article.description }]);
  }

  categorySelectionChanged(event: any) {
    console.log(event);
  }

}
