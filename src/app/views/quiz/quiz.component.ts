import { Component, HostListener, OnInit } from '@angular/core';
import { QuizService, ValidationMessageService } from 'src/app/services';
import { QuizInterface } from '../../interfaces/quiz.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public code: string;
  public id?: string;
  public tempId!: string;

  public innerWidth!: number;
  public toggle: boolean = true;

  constructor(private messageSvc: ValidationMessageService, private quizSvc: QuizService, private router: Router) { 
    this.code = 'QUIZ'
  }

  ngOnInit(): void {
    this.onResize(false);
  }

  async reciveQuiz(quiz: QuizInterface) {

    this.code = quiz.code;
    this.id = this.id

    this.tempId = await this.getQuiz(quiz);
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

  deleteQuestion() {
    
    

    if(this.id != '' || this.id != undefined) {
      this.quizSvc.deleteQuiz(this.tempId).subscribe(
        res => {
          
          this.messageSvc.showMessage('Quiz deleted', 'DELETED', true);
          return this.router.navigate(['/home'])
        },
        err => {
          console.log(err);
          
          return this.messageSvc.showMessage('Error deleting quiz', 'ERROR', false);
        }
      )
    }

  }

  getQuiz(quiz: QuizInterface): string {
    return quiz._id;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 992) {      
      this.toggle = false;
    }

  }
}
