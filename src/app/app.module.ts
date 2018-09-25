import { ProfilePage } from './../pages/profile/profile';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ComponentsModule } from '../components/components.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DatabaseProvider } from '../providers/database/database';


const config = {
  apiKey: "AIzaSyAiwR4wZB-J89r3ExyTKYV1ECl3MOo6K_E",
  authDomain: "namopotipora.firebaseapp.com",
  databaseURL: "https://namopotipora.firebaseio.com",
  projectId: "namopotipora",
  storageBucket: "namopotipora.appspot.com",
  messagingSenderId: "143067202746"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Facebook,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    DatabaseProvider
  ]
})
export class AppModule {}
