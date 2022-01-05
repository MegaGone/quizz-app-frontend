import { Pipe, PipeTransform } from '@angular/core';
import { QuizToList } from '../interfaces';

@Pipe({
  name: 'quizzes'
})
export class QuizzesPipe implements PipeTransform {

  transform(quizzes: QuizToList[], page: number = 0): QuizToList[] {
    return quizzes.slice(page, page + 5);
  }

}
