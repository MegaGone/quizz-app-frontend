import { Component, OnInit } from '@angular/core';
import { QuizInterface } from '../../interfaces/quiz.interface';
import { ValidationMessageService } from '../../services/validation.message.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public code: string;
  public id?: string;

  constructor(private messageSvc: ValidationMessageService) { 
    this.code = 'QUIZ'
  }

  ngOnInit(): void {
  }

  reciveQuiz(quiz: QuizInterface) {

    this.code = quiz.code;
    this.id = this.id

  }

  copyCode(code: string) {

    this.messageSvc.showCopyToClipboard('Copy to clipboard', 'Copied')

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = code;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
