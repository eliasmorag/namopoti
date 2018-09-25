import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Platform } from "ionic-angular";
import { switchMap, first } from "rxjs/operators";
import { of } from 'rxjs';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
    private facebook: Facebook,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.af.object<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  private updateUserData(user: any) {
    const userRef: AngularFireObject<any> = this.af.object(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'usuario sin nombre',
      photoURL: user.photoURL + "?height=500" || "https://goo.gl/7kz9qG"
    };
    return userRef.set(data);
  }

  async facebookLogin() {
    if (this.platform.is("cordova")) {
      return await this.nativeFacebookLogin();
    } else {
      return await this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin(): Promise<void> {
    try {
      const response = await this.facebook.login(["email", "public_profile"]);
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      const firebaseUser = await firebase.auth().signInWithCredential(facebookCredential);

      return await this.updateUserData(firebaseUser);
    } catch (err) {
      console.log(err);
    }
  }

  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      return await this.updateUserData(credential.user);
    } catch (err) {
      console.log(err);
    }
  }

  async logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  // Current user as a Promise. Useful for one-off operations.
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise();
  }

  // Current user as boolean Promise. Used in router guards
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

}
