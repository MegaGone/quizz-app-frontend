import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { QuizzlistComponent } from './quizzlist/quizzlist.component';

// Pipes
import { QuizzesPipe } from '../pipes/quizzes.pipe';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ParticipantsComponent } from './participants/participants.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    QuizzlistComponent,
    QuizzesPipe,
    FormComponent,
    QuestionsComponent,
    ParticipantsComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    QuizzlistComponent,
    FormComponent,
    QuestionsComponent,
    ParticipantsComponent,
    AnswerComponent
  ]
})
export class ComponentsModule { }
