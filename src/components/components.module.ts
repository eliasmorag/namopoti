import { NgModule } from '@angular/core';
import { UserLogoutComponent } from './user-logout/user-logout';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivityFeedComponent } from './activity-feed/activity-feed';

@NgModule({
	declarations: [UserLogoutComponent,
    ActivityFeedComponent],
	imports: [CommonModule, IonicModule],
	exports: [UserLogoutComponent,
    ActivityFeedComponent]
})
export class ComponentsModule {}
