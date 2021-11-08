import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbdSortableQuizHeaderDirective } from './ngbd-sorteable-headerquiz.directive';


@NgModule({
  declarations: [
    NgbdSortableQuizHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgbdSortableQuizHeaderDirective
  ]
})
export class DirectivesModule { }
