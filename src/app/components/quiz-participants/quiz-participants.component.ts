import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParticipantInterface } from 'src/app/interfaces';
import { ValidationMessageService } from 'src/app/services';

@Component({
  selector: 'app-quiz-participants',
  templateUrl: './quiz-participants.component.html',
  styleUrls: ['./quiz-participants.component.css'],
})
export class QuizParticipantsComponent implements OnInit {
  @Input() Participants?: ParticipantInterface[];

  constructor(
    private modalSvc: NgbModal,
    private messagesSvc: ValidationMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.Participants?.length);
  }

  /**
   *
   * @param id : String | Number = View result of the participant
   */
  viewResults(id: number | string) {
    this.modalSvc.dismissAll();

    // TODO: Call the method to get the results of the participant using the id

    this.router.navigate(['play/results']);
  }

  // Copy to clipboard
  copyInputMessage(input: HTMLInputElement) {
    this.messagesSvc.showCopyToClipboard('Copy to clipboard', 'Copied');
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }
}
