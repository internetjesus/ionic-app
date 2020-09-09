import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {LoginPageComponent} from './containers/login/login-page.component';
import {userRoutes} from './user.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ForgotPasswordPageComponent} from './containers/forgot-password/forgot-password-page.component';
import {ProfilePageComponent} from './containers/profile/profile-page.component';

@NgModule({
  declarations: [
      LoginPageComponent,
      ForgotPasswordPageComponent,
      ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
