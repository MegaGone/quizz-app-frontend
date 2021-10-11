import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// My components
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    ListComponent
  ]
})
export class ComponentsModule { }
