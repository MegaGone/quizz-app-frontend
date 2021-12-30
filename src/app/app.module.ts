import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// My Modules
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { PlayModule } from './play/play.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    NgbModule,
    ComponentsModule,
    PlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
