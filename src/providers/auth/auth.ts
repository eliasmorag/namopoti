import { LoginPage } from './../../pages/login/login';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private fb: Facebook, public app: App) {
    console.log('Hello AuthProvider Provider');
  }

  public login(): Promise<any> {
    return  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

  public logout(): void {
    this.fb.logout();
    let navCtrl = this.app.getActiveNav();
    navCtrl.setRoot(LoginPage);
  }

  public isAuthenticated(): boolean {
    this.fb.getLoginStatus()
      .then((res: FacebookLoginResponse) => {
        return res.status === 'connected'
      });
    return false;
  }

}
