import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// My Guards
import { AuthGuard } from '../guards/auth.guard';

// My Components
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizzesComponent } from './quizzes/quizzes.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [ AuthGuard ],
    children: [
      { path: 'myquizzes', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: '**', redirectTo: 'myquizzes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ViewsRoutingModule { }
