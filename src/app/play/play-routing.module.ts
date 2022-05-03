import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


import { AnswersComponent } from './answers/answers.component';
import { CounterComponent } from './counter/counter.component';
import { NameComponent } from './name/name.component';
import { ResultsComponent } from './results/results.component';
import { GuestComponent } from './guest/guest.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ AuthGuard ],
    children: [
      { path: '',         component: NameComponent    },
      { path: 'answer',   component: AnswersComponent },
      { path: 'results',  component: ResultsComponent },
      { path: 'start',    component: CounterComponent },
      { path: 'guest',    component: GuestComponent   },
      { path: '**',       redirectTo: ''              }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
