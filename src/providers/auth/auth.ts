import { LoginPage } from './../../pages/login/login';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { App, ToastController } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  userData: any;
  public user:any = null;
  logged ={
		loggedIn: false,
	}

  constructor(private fb: Facebook, public app: App, public toastCtrl: ToastController) {
    console.log('Hello AuthProvider Provider');
    if (this.user) {
	    this.logged.loggedIn = true;
      this.user = firebase.auth().currentUser;
	  }
  }

  public login(): Promise<any> {
    return  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
          var credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(credential).then(   success => { this.logged.loggedIn = true;
                                                                                this.user = firebase.auth().currentUser;
                                                                                window.localStorage.setItem('user', JSON.parse(this.user));});
         }).then( () => { this.fb.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', []).then(profile => { 
      this.userData = {email: profile['email'], picture: profile['picture_large']['data']['url'], userName: profile['name']};
    })}
    ).catch(e => console.log('Error logging into Facebook', e));
  }

  public logout(): void {
    this.fb.logout();
    this.logged.loggedIn = false;
    let navCtrl = this.app.getActiveNav();
    navCtrl.setRoot(LoginPage);
  }

  public isAuthenticated(): boolean {
    if(this.logged.loggedIn){
      return true;
    }
    /*this.fb.getLoginStatus()
      .then((res: FacebookLoginResponse) => {
        return res.status === 'connected'
      });*/
    return false;
  }

  public getUserData() : any {
    return this.userData;
  }

  showToast(name) {
    const toast = this.toastCtrl.create({
      message: 'Bienvenido ' + name,
      position: 'bottom',
      duration: 1000
    });
    toast.present();
  }

}
