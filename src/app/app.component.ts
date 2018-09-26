import { ProfilePage } from './../pages/profile/profile';
import { AuthProvider } from './../providers/auth/auth';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = null;

  pages: Array<{title: string, component: any}>;

  showSplash = true;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public auth: AuthProvider) {
      platform.ready().then(() => {
        auth.getCurrentUser()
        .then(user => { 
          if (user) {
            this.rootPage = HomePage 
          } else {
            this.rootPage = LoginPage
          }

          this.statusBar.styleLightContent();
          this.statusBar.backgroundColorByHexString('#4EAE1F');
          this.splashScreen.hide();
          timer(3000).subscribe(()=> this.showSplash = false);        
        })

      });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi Perfil', component: ProfilePage },
      { title: 'Mis Actividades', component: ListPage },
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
