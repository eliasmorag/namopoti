import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public auth: AuthProvider, 
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {}

  async login() {

    await this.auth.facebookLogin();
    await this.showToast();
    await this.navCtrl.setRoot(HomePage)

  }

  showToast() {
    const toast = this.toastCtrl.create({
      message: 'Bienvenido ',
      position: 'bottom',
      duration: 1000
    });
    toast.present();
  }

}
