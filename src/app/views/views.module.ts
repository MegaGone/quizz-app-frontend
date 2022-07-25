import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PlayModule } from '../play/play.module';

// My Components
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    QuizComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PlayModule,
    NgbModule
  ]
})
export class ViewsModule { }
