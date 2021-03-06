import { AbstractControl, FormArray } from '@angular/forms';
import { AnswerInterface } from '../interfaces';

export class AnswersValidations {
  static minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value.length >= min) return null;

      return { minLengthArray: true };
    };
  }

  static allAnswersFalse(control: AbstractControl): { [key: string]: boolean } | null {

    // Get the formArray
    const answers = control.value;

    // Filtered the answers
    const answerFiltered = answers.filter((answer: AnswerInterface) => answer.isCorrect == false);

    // Validation with 4, cause 4 answers is the maximum, if the all answers are false.
    if (answerFiltered.length === answers.length) {
      return { answersFalse: true };
    }

    return null;
  }

  static allAnswersTrue(control: AbstractControl): { [key: string]: boolean } | null {

    // Get the formArray
    const answers = control.value;

    // Filtered answers
    const answersFiltered = answers.filter((answer: AnswerInterface) => answer.isCorrect == true);

    if(answersFiltered.length === answers.length) {
      return { answersTrue: true }
    }

    return null;
  }
}
