import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// My Guards
import { AuthGuard } from '../guards/auth.guard';

// My Components
import { HomeComponent } from './home/home.component';
import { InvitedComponent } from './invited/invited.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    children: [
      { path: 'myquizzes',      component: HomeComponent    },
      { path: 'profile',        component: ProfileComponent },
      { path: 'quiz/:quizCode', component: QuizComponent    },
      { path: 'invited',        component: InvitedComponent },
      { path: '**', redirectTo: 'myquizzes' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ViewsRoutingModule {}
