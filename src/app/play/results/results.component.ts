import { Component, OnInit } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  public loaded   : boolean = false;
  public userStats!: ICreateStats;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { }

  async ngOnInit() {
    await this.getUserStats();
  }

  getUserStats() {
    this.playSvc.getQuizPlayed().subscribe((res: ICreateStats) => {
      this.userStats = res;
      console.log(res)
      this.loaded = true;
    })
  }
}
