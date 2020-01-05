import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public router: Router,
    public storage: Storage,
    public user: UserService
  ) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this;

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      // Show successfuly log in toast
      this.presentToast("Successfully Logged In", "success")

      this.afAuth.authState.subscribe(r => {

        // if the object exists and the user has an ID we consider them logged in
        if (r && r.uid) {
          console.log("User is logged in");
          
          // Set the user
          this.user.setUser({
            username: email,
            uid: r.uid
          })

          // Store e-mail and password into ionic storage (sqLite) for auto-login
          this.storage.set('email', email);
          this.storage.set('password', password);

          // Navigate to tabs
          this.router.navigate(['/tabs/news']);

          // User is not logged in  
        } else {
          console.log("User is not logged in");
        }
      });
    }
    catch (err) {
      console.dir(err);

      if (err.code === "auth/user-not-found") {
        this.presentToast("User Account Not Found", "danger");
        console.log("User Not Found");
      }
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
      position: "bottom"
    });

    toast.present();
  }
}
