import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.page.html',
  styleUrls: ['./bookmarked.page.scss'],
})
export class BookmarkedPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public user: UserService
  ) { }

  ngOnInit() {
  }

  getDetails(article) {
    this.router.navigate(['/tabs/newsarticle', { 'title': article.articleTitle, 'img': article.articleImage, 'url': article.articleUrl, 'content': article.articleContent, 'description': article.articleDescription }]);
  }

}
