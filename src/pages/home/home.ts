import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;
  userData: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,  afDB: AngularFireDatabase, auth: AuthProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.items = afDB.list('tarjetas').valueChanges();
    this.userData = auth.getUserData();
  }

}
