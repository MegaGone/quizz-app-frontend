import { Component, OnInit, ViewChild, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']

})
export class ResultsComponent implements OnInit {

  public answer: EventEmitter<number> = new EventEmitter();
  public details: EventEmitter<ICreateStats> = new EventEmitter();
  public answers: EventEmitter<IAnswerStat[]> = new EventEmitter();

  public loaded: boolean = false;
  public userStats!: ICreateStats;

  public optionSelected!: any;

  public innerWidth!: number;
  public toggle!: boolean;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { }

  async ngOnInit() {    
    await this.getUserStats();
    this.onResize(false);
  }

  getUserStats() {
    const token = localStorage.getItem('y-token');

    if (!token || token == undefined) {
      return this.router.navigate(['/play']);
    }

    this.playSvc.getUserStatsGuest(token).subscribe(
      res => {
          this.userStats = res!;
          this.loaded = true;
          this.details.emit(this.userStats);
          this.answers.emit(this.userStats.answers);
          this.selectAnswer(this.userStats.answers[0], 0)
      },
      err => {        
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
  selectAnswer(answer: IAnswerStat, i: number = 0): void {
    this.answer.emit(i);
    this.optionSelected = answer;
  }

  /**
 * 
 * @param answer: Answer - Answer selected
 * @returns Class selectedAnswer (Paint the selected answer)
 */
  paintSelectedAnswer(answer: IAnswerStat): string {
    return (answer === this.optionSelected) ? "selectedtAnswer" : '';
  }

  /**
   * 
   * @param correct: number - Total correct answers
   * @param incorrect: number - Total incorrect answers
   * @returns total answers
   */
  getTotalPoints(correct: number, incorrect: number): number {
    return correct + incorrect;
  }

  /**
   * 
   * @returns EXIT
   */
  exit() {
    localStorage.removeItem('y-token');
    return this.router.navigate(['/play'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.innerWidth = window.innerWidth;

    (this.innerWidth <= 767) ? this.toggle = true : this.toggle = false;

  }
}
