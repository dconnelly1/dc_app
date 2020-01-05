import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private user: UserService) { }

  currentUser: UserService;

  ngOnInit() {

    // Set the user object
    this.currentUser = this.user;

  }

  technologyChanged(checked: boolean) {
    this.currentUser.newsPreference.showTechnologyNews = checked;
    this.currentUser.pushSettingsToFirestore();
  }

  entertainmentChanged(checked: boolean) {
    this.currentUser.newsPreference.showEntertainmentNews = checked;
    this.currentUser.pushSettingsToFirestore();
  }

  politicalChanged(checked: boolean) {
    this.currentUser.newsPreference.showPoliticalNews = checked;
    this.currentUser.pushSettingsToFirestore();
  }
 
}
