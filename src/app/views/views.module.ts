import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

// My Components
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizzesComponent } from './quizzes/quizzes.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    QuizzesComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    RouterModule,
    ComponentsModule
  ]
})
export class ViewsModule { }
