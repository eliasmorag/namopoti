import { NgModule } from '@angular/core';
import { UserLogoutComponent } from './user-logout/user-logout';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [UserLogoutComponent],
	imports: [CommonModule, IonicModule],
	exports: [UserLogoutComponent]
})
export class ComponentsModule {}
