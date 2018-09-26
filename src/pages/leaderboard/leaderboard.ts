import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Observable } from 'rxjs';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  bolsas  : Observable<any[]>;
  bolsones  : Observable<any[]>;
  users : Array<string> = [];
  user: Observable<any>;

  constructor(
    private db: DatabaseProvider
  ) { }

  ngOnInit() {
      this.bolsas = this.db.getPoints().valueChanges();
      this.bolsones = this.db.getPoints().snapshotChanges();
      this.bolsones.subscribe(element => 
                              element.map(action => 
                                          this.db.getUser(action.key).valueChanges().subscribe(value => 
                                                                                              this.users.push(value.displayName)
                                                                                              )
                                          )
                              );
  }
}
