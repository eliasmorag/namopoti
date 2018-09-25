import { DatabaseProvider} from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, MenuController, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/';
import { AuthProvider } from '../../providers/auth/auth';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;
  userData: any;

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,  
    afDB: AngularFireDatabase, 
    public auth: AuthProvider,
    private socialSharing: SocialSharing,
    public db: DatabaseProvider,
    public toastCtrl: ToastController){
    this.menuCtrl.enable(true, 'myMenu');
    this.items = afDB.list('tarjetas').valueChanges();
  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }

  shareInFacebook(item:any) {
    this.socialSharing.shareViaFacebookWithPasteMessageHint(item.descripcion, item.src).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  async addActivity(user, item) {
    await this.db.createActivity(user.uid, item.id, item.nombre);
    await this.db.addPoints(user.uid, item.puntos);
    await this.showToast();
  }

  showToast() {
    const toast = this.toastCtrl.create({
      message: 'Actividad registrada',
      position: 'bottom',
      duration: 1000
    });
    toast.present();
  }
}
