import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayRoutingModule } from './play-routing.module';
import { ResultsComponent } from './results/results.component';
import { NameComponent } from './name/name.component';
import { CounterComponent } from './counter/counter.component';
import { AnswersComponent } from './answers/answers.component';


@NgModule({
  declarations: [
    ResultsComponent,
    NameComponent,
    CounterComponent,
    AnswersComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlayModule { }
