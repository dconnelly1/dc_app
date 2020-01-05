import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

export interface user {
  username: string
  uid: string
}

export interface userNewsPreference {
  showTechnologyNews: boolean;
  showPoliticalNews: boolean;
  showEntertainmentNews: boolean;
}

export interface bookmarks {
  bookmarks: bookmark[]
}

export interface bookmark {
  articleTitle: string;
  articleImage: string;
  articleUrl: string;
  articleContent: string;
  articleDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: user;
  public newsPreference: userNewsPreference;
  private preferencesDoc: AngularFirestoreDocument<userNewsPreference>;
  private starterPreferences: Observable<userNewsPreference>;
  private bookmarksDoc: AngularFirestoreDocument<bookmarks>;
  private startBookmarks: Observable<bookmarks>;
  public userBookmarks: bookmarks;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {

    // Get settings from data
    this.afAuth.authState.subscribe(r => {

      if (r && r.uid) {
        this.preferencesDoc = this.afStore.doc<userNewsPreference>(`settings/${r.uid}`);
        this.starterPreferences = this.preferencesDoc.valueChanges();

        this.starterPreferences.subscribe(r => {
          this.newsPreference = {
            showEntertainmentNews: r.showEntertainmentNews,
            showPoliticalNews: r.showPoliticalNews,
            showTechnologyNews: r.showTechnologyNews
          }
        });

        this.bookmarksDoc = this.afStore.doc<bookmarks>(`bookmarks/${r.uid}`);
        this.startBookmarks = this.bookmarksDoc.valueChanges();

        this.startBookmarks.subscribe(r => {
          this.userBookmarks = {
            bookmarks: r.bookmarks
          }
        });
      }

    });
  }

  updateBookmarks(newBookmark: bookmark) {
    console.log(newBookmark);

    if (!this.userBookmarks.bookmarks) {
      this.userBookmarks.bookmarks = [];
    }

    this.userBookmarks.bookmarks.push(newBookmark);
    this.bookmarksDoc.update(this.userBookmarks);
  }

  setUser(user: user) {
    this.user = user;
  }

  getUid() {
    return this.user.uid;
  }

  pushSettingsToFirestore() {
    this.afAuth.authState.subscribe(r => {
      if (r && r.uid) {

        this.afStore.doc(`settings/${r.uid}`).set({
          showTechnologyNews: this.newsPreference.showTechnologyNews,
          showPoliticalNews: this.newsPreference.showPoliticalNews,
          showEntertainmentNews: this.newsPreference.showEntertainmentNews
        });

      }
    });
  }

  uploadPreferencesToFirestore() {
    this.afAuth.authState.subscribe(r => {
      if (r && r.uid) {
        this.afStore.doc(`settings/${r.uid}`).set(this.newsPreference);
      }
    });
  }

  uploadBookmark
}
