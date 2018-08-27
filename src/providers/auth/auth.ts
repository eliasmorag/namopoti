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

  userData: any;
  constructor(private fb: Facebook, public app: App) {
    console.log('Hello AuthProvider Provider');
  }

  public login(): Promise<any> {
    return  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => { this.fb.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', [])
      .then(profile => { 
        this.userData = {email: profile['email'], picture: profile['picture_large']['data']['url'], userName: profile['name']};
      });
    }).catch(e => console.log('Error logging into Facebook', e));
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

  public getUserData() : any {
    return this.userData;
  }

}
