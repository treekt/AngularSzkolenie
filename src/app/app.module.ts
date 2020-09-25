import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './core/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { AuthComponent } from './core/auth/auth.component';
import { AuthProcessComponent } from './core/auth-process/auth-process.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { ArtistPageComponent } from './core/artist-page/artist-page.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HighlightDirective } from './directives/highlight.directive';
import { SongsDialogComponent } from './core/artist-page/songs-dialog/songs-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    AuthProcessComponent,
    ArtistPageComponent,
    DashboardComponent,
    HighlightDirective,
    SongsDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
