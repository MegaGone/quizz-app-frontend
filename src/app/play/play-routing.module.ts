import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


import { AnswersComponent } from './answers/answers.component';
import { CounterComponent } from './counter/counter.component';
import { NameComponent } from './name/name.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    children: [
      { path: 'answer',   component: AnswersComponent },
      { path: 'name',     component: NameComponent    },
      { path: 'start',    component: CounterComponent },
      { path: 'results',  component: ResultsComponent },
      { path: '**', redirectTo: 'name' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
