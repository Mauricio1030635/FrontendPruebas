import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { BoardsComponent } from './boards.component';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BoardsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ]
})
export class BoardsModule { }
