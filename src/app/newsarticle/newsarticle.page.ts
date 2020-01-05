import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { INewsArticle } from '../interfaces/INewsArticle';
import { DataService } from '../data.service';
import { UserService, bookmark } from '../user.service';

@Component({
  selector: 'app-newsarticle',
  templateUrl: './newsarticle.page.html',
  styleUrls: ['./newsarticle.page.scss'],
})
export class NewsarticlePage implements OnInit {
  articleTitle: string;
  articleImage: string;
  articleUrl: string;
  articleContent: string;
  articleDescription: string;
  articleBookmarked: boolean;

  articleSummary: INewsArticle = { summary: 'testing', status: { code: 1, msg: "" } };

  constructor(
    private actRoute: ActivatedRoute,
    private data: DataService,
    private user: UserService
    ) { }

  ngOnInit() {
    this.articleTitle = this.actRoute.snapshot.paramMap.get('title');
    this.articleUrl = this.actRoute.snapshot.paramMap.get('url');
    this.articleImage = this.actRoute.snapshot.paramMap.get('img');
    this.articleContent = this.actRoute.snapshot.paramMap.get('content');
    this.articleDescription = this.actRoute.snapshot.paramMap.get('description');

    // Disabled for having to pay for the new API to have full content articles; URL parsing does not work well enough
    //this.data.summarizeArticle(this.articleUrl, 5).subscribe(data => this.articleSummary = data);
  }

  bookmarkArticle() {

    const newBookmark: bookmark = {
      articleContent: this.articleContent,
      articleTitle: this.articleTitle,
      articleUrl: this.articleUrl,
      articleDescription: this.articleDescription,
      articleImage: this.articleImage
    };

    this.user.updateBookmarks(newBookmark);

  }

}
