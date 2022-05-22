import { Component, OnInit } from '@angular/core';
import { ICreateStats } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  public userStats!: ICreateStats;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { }

  ngOnInit(): void {
    this.getUserStats();
  }

  /**
   * 
   * @returns userStats
   */
  getUserStats(): void {

    const quizId   = localStorage.getItem('QuizId');
    const playerId = localStorage.getItem('PlayerId');

    if (!quizId || quizId == undefined || !playerId || playerId == undefined) {
      this.router.navigate(['/play']);
      return;
    }

    this.playSvc.getQuizPlayed().subscribe(
      (res: ICreateStats) => {
        this.userStats = res
        console.log(this.userStats)
        return;
      },
      err => {
        this.msgSvc.showMessage('Ooops, something was wrong!', 'Error', false);
        return this.router.navigate(['/play'])
      }
    )
  }
}
