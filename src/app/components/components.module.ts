import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { QuestionsComponent } from './questions/questions.component';
import { ParticipantsComponent } from './participants/participants.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ListComponent,
    FormComponent,
    QuestionsComponent,
    ParticipantsComponent,
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
    ListComponent,
    FormComponent,
    QuestionsComponent
  ]
})
export class ComponentsModule { }
