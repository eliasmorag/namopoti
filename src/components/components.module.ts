import { NgModule } from '@angular/core';
import { UserLogoutComponent } from './user-logout/user-logout';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivityFeedComponent } from './activity-feed/activity-feed';
import { UserPointsComponent } from './user-points/user-points';

@NgModule({
	declarations: [UserLogoutComponent,
    ActivityFeedComponent,
    UserPointsComponent],
	imports: [CommonModule, IonicModule],
	exports: [UserLogoutComponent,
    ActivityFeedComponent,
    UserPointsComponent]
})
export class ComponentsModule {}
