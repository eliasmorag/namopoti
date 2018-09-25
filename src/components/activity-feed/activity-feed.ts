import { Observable } from 'rxjs/';
import { AuthProvider } from './../../providers/auth/auth';
import { DatabaseProvider } from './../../providers/database/database';
import { Component, OnInit} from '@angular/core';

/**
 * Generated class for the ActivityFeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'activity-feed',
  templateUrl: 'activity-feed.html'
})
export class ActivityFeedComponent implements OnInit{

  activities: Observable<any[]>;

  constructor(
    private db: DatabaseProvider,
    public auth: AuthProvider
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.activities = this.db.getUserActivities(user.uid).valueChanges();
    });
  }

}
