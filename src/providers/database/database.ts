import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import firebase from 'firebase';

export interface Activity {
  createdAt: any;
  cardId: number;
  description: string;
}

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {



  constructor(
    private af: AngularFireDatabase 
  ) {
  }

  getUser(uid: any): AngularFireObject<any> {
    return this.af.object('/users/' + uid);
  }

  getRecentUserActivities(userId: string) {
    // falta implementar
  }

  getUserActivities(userId: string) {
    return this.af.list('/activities/' + userId, ref => ref.orderByChild('createdAt'));
  }

  getPoints() {
    return this.af.list('/puntos/', ref => ref.orderByChild('order'));
  }


  createActivity(userId: string, cardId: number, cardDescription: string ) {
    const createdAt = firebase.database.ServerValue.TIMESTAMP;
    const item = {createdAt, cardId, cardDescription};
    const userActivitiesRef = this.af.list('activities/' + userId);
    return userActivitiesRef.push(item);
  }

  addPoints(userId: string, cardPoints: number) {
    this.af.database.ref('puntos/' + userId + '/bolsa').transaction(bolsa => {
      if (bolsa === null) {
        return bolsa = cardPoints;
      } else {
        return bolsa + cardPoints;
      }
    });
    this.af.database.ref('puntos/' + userId + '/order').transaction(order => {
      if (order === null) {
        return order = 100000 - cardPoints;
      } else {
        return order - cardPoints;
      }
    });
  }

  getUserPoints(userId: string): AngularFireObject<any> {
    return this.af.object('/puntos/' + userId);
  }



}
