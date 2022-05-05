import { Component, OnInit } from '@angular/core';
import { IGetQuizByCodeResponse, QuizInterface } from 'src/app/interfaces';
import { PlayService } from 'src/app/services';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  public currentQuiz!: QuizInterface;

  constructor(private playSvc: PlayService) { }

  ngOnInit(): void {
    this.getCurrentQuiz();
    console.log(this.currentQuiz);
  }

  /**
   * @returns CurrentQuiz
   */
  getCurrentQuiz() {
    this.playSvc.getCurrentQuiz().subscribe((res: IGetQuizByCodeResponse) => {
      if(res.quizDB) {
        this.currentQuiz = res.quizDB;
      }
    })
  }

}
