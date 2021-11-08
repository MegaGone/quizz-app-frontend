import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { QuizInterface, QuizzesExample } from 'src/app/interfaces';
import { QuizlistService } from 'src/app/services/quizlist.service';
import { NgbdSortableQuizHeaderDirective, SortEvent } from 'src/app/directives/ngbd-sorteable-headerquiz.directive';

@Component({
  selector: 'app-quizlist',
  templateUrl: './quizlist.component.html',
  providers: [QuizlistService, DecimalPipe]
})
export class QuizlistComponent implements OnInit {

  quizzes$!: Observable<QuizInterface[]>;
  total$!: Observable<number>;

  @ViewChildren(NgbdSortableQuizHeaderDirective) headers!: QueryList<NgbdSortableQuizHeaderDirective>;

  constructor(public service: QuizlistService, private router: Router) {
    this.quizzes$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  navigateToQuiz(id: string | number) {
    console.log(id);
    this.router.navigate(['/home/quiz'])
  }
}
