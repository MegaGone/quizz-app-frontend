import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']

})
export class ResultsComponent implements OnInit {

  @ViewChild('asAnswer') answer!: ElementRef;

  public loaded   : boolean = false;
  public userStats!: ICreateStats;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { }

  async ngOnInit() {
    await this.getUserStats();
  }

  getUserStats() {
    const quizId = localStorage.getItem('QuizId');
    const userId = localStorage.getItem('PlayerId');

    if (!quizId || !userId || quizId == undefined || userId == undefined) {
      return this.router.navigate(['/play']);
    }

    this.playSvc.getQuizPlayed().subscribe(
      (res: ICreateStats) => {
        this.userStats = res;
        this.loaded = true;
      },
      (err: any) => {
        this.msgSvc.showMessage('Ooops something was wrong!', 'ERROR', false);
        return this.router.navigate(['/play']);
      }
    )
    return;
  }

  /**
   * 
   * @param answer: IAnswerStat - Answer selected
   * @param i: number - Index
   */
  selectAnswer(answer: IAnswerStat, i: number) {
    console.log(answer)
  }
}
