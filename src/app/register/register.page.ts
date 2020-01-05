import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public router: Router,
    public storage: Storage,
    public user: UserService
  ) { }

  ngOnInit() {

    // Is there a username and password stored?
    this.storage.get('email').then((email) => {
      if (email === null) {
        return;
      }

      this.storage.get('password').then((password) => {
        if (password === null) {
          return;
        }

        this.login(email, password);
      });
    });

  }

  async register() {
    const { email, password, cpassword } = this;

    if (password !== cpassword) {
      // Passwords do not match, show warning toast
      this.presentToast("Passwords Do Not Match", "danger");
      return console.error("Passwords Do Not Match");
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      this.afAuth.authState.subscribe(r => {

        // if the object exists and the user has an ID we consider them logged in
        if (r && r.uid) {
          console.log("User is logged in");

          // Show successful toast
          this.presentToast("Successfully Created Account", "success");

          // Set the user
          this.user.setUser({
            username: email,
            uid: r.uid
          })

          this.storage.set('email', email);
          this.storage.set('password', password);

          // Navigate to tabs
          this.router.navigate(['/tabs/news']);

          // User is not logged in  
        } else {
          console.log("User is not logged in");
        }
      });
      console.log(res);
    }
    catch (err) {
      console.dir(err);
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  async login(email: string, password: string) {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      // Show successfuly log in toast
      this.presentToast("Successfully Logged In", "success")

      // Store e-mail and password into ionic storage (sqLite)
      this.storage.set('email', email);
      this.storage.set('password', password);

      // Log e-mail and password for testing
      this.storage.get('email').then(r => console.log(r));

      // Navigate to tabs
      this.router.navigate(['/tabs/news']);
    }
    catch (err) {
      console.dir(err);

      if (err.code === "auth/user-not-found") {
        this.presentToast("User Account Not Found", "danger");
        console.log("User Not Found");
      }
    }
  }

  async presentToast(toastMessage: string, color: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000,
      color: color,
      position: "bottom"
    });

    toast.present();
  }
}
