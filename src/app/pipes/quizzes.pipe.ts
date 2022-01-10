import { Pipe, PipeTransform } from '@angular/core';
import { QuizToList } from '../interfaces';

@Pipe({
  name: 'quizzes'
})
export class QuizzesPipe implements PipeTransform {

  transform(quizzes: QuizToList[], page: number = 0, term: string = ''): QuizToList[] {

    if (term.length === 0) {
      return quizzes.slice(page, page + 5);
    }

    const filteredQuizzes = quizzes.filter( quiz => quiz.name.includes(term));

    return filteredQuizzes.slice(page, page + 5);
  }

}
