import { Observable } from 'rxjs/';
import { AuthProvider } from './../../providers/auth/auth';
import { DatabaseProvider } from './../../providers/database/database';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'user-points',
  templateUrl: 'user-points.html'
})
export class UserPointsComponent implements OnInit{

  puntos: Observable<any>;

  constructor(
    private db: DatabaseProvider,
    public auth: AuthProvider
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.db.getUserPoints(user.uid).valueChanges()
      .subscribe(bolsa => this.puntos = bolsa.bolsa);
    });
  }

}
