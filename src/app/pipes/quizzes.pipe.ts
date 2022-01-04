import { Pipe, PipeTransform } from '@angular/core';
import { QuizzList } from '../interfaces';

@Pipe({
  name: 'quizzes'
})
export class QuizzesPipe implements PipeTransform {

  transform(quizzes: QuizzList[], page: number = 0): QuizzList[] {
    return quizzes.slice(page, page + 5);
  }

}
