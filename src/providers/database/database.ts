import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';

export interface Activity {
  createdAt: any;
  cardId: number;
}

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private activitiesRef: AngularFireList<Activity>;


  constructor(
    private af: AngularFireDatabase 
  ) {
    this.activitiesRef = this.af.list('activities');
  }

  getRecentUserActivities(userId: string) {
    // falta implementar
  }

  getUserActivities(userId: string) {
    return this.af.list('/activities/' + userId, ref => ref.orderByChild('createdAt'));
  }

  createActivity(userId: string, cardId: number ) {
    const createdAt = firebase.database.ServerValue.TIMESTAMP;
    const item = {createdAt, cardId};
    const userActivitiesRef = this.af.list('activities/' + userId);
    return userActivitiesRef.push(item);
  }

}
