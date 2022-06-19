import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnswerStat, ICreateStats, IPlayerStats } from 'src/app/interfaces';
import { PlayService } from 'src/app/services';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public quizId !: string;
  public userId !: string;

  public stats  !: ICreateStats;
  public loaded !: boolean;

  public answer: EventEmitter<number> = new EventEmitter();
  public details: EventEmitter<ICreateStats> = new EventEmitter();
  public answers: EventEmitter<IAnswerStat[]> = new EventEmitter();

  public optionSelected!: any;

  constructor(private route: ActivatedRoute, private router: Router, private playSvc: PlayService) { }

  ngOnInit(): void {
    this.getQuizId();
    this.getStats();
  }

  /**
   * 
   * @returns QuizID
   */
  getQuizId() {
    const id = this.route.snapshot.paramMap.get('id');
    const user = this.route.snapshot.paramMap.get('user');

    if (!id || id == undefined || !user || user == undefined) {
      return this.router.navigate(['/home/myquizzes']);
    }

    this.userId = user;
    return this.quizId = id;
  }

  /**
   * GET STATS
   */
  getStats() {
    this.playSvc.getUsersStats(this.quizId, this.userId).subscribe(
      (res: IPlayerStats) => {

        if (res.Ok && res.playerStats) {
          this.stats = res.playerStats;
          this.loaded = true;
          this.details.emit(this.stats);
          this.answers.emit(this.stats.answers);
          this.selectAnswer(this.stats.answers[0], 0)
          return;
        }

        return this.router.navigate(['/home/myquizzes']);
      },
      err => {
        console.log(err);
        return this.router.navigate(['/home/myquizzes']);
      }
    )
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
}
