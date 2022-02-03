import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizParticipantsComponent } from './quiz-participants/quiz-participants.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { QuizzlistComponent } from './quizzlist/quizzlist.component';

// Pipes
import { QuizzesPipe } from '../pipes/quizzes.pipe';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    NavbarComponent,
    QuizzlistComponent,
    QuizzesPipe,
    QuizFormComponent,
    QuizParticipantsComponent,
    QuizQuestionsComponent,
    FormComponent,
    QuestionsComponent
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
    QuizFormComponent,
    QuizParticipantsComponent,
    QuizQuestionsComponent,
    FormComponent,
    QuestionsComponent
  ]
})
export class ComponentsModule { }
