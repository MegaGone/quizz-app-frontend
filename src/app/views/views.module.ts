import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

// My Components
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    QuizComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ViewsModule { }
