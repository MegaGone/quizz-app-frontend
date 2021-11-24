import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ParticipantsComponent } from './participants/participants.component';
import { QuizlistComponent } from './quizlist/quizlist.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
    QuestionsComponent,
    ParticipantsComponent,
    QuizlistComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    QuestionsComponent,
    QuizlistComponent,
    QuestionComponent
  ]
})
export class ComponentsModule { }
