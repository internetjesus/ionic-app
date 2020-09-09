import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientService} from './services/http-client.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      AuthService,
      HttpClientService,
      AuthGuard,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if ( parentModule ) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }
}
