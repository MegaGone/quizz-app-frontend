import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Quiz, Quizzes } from '../../interfaces';
import { QuizService } from '../../services/quiz.service';
import { SortEvent, NgbdSortableHeaderDirective } from '../../directives/ngbd-sortable-header.directive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [QuizService, DecimalPipe]
})
export class ListComponent implements OnInit {

  countries$!: Observable<Quiz[]>;
  total$!: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(public service: QuizService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
