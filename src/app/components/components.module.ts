import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { QuestionComponent } from './question/question.component';
import { ParticipantsComponent } from './participants/participants.component';
import { QuizlistComponent } from './quizlist/quizlist.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
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
    RxReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    QuizlistComponent,
    QuestionComponent
  ]
})
export class ComponentsModule { }
