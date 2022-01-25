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
  /*
   ** ARRAY FROM PARENT COMPONENT
   */
  @Input() Participants: ParticipantInterface[] = [];

  // TODO: Get quiz code with input from parent component.

  /*
   ** PAGINATION
   */
  public page = 1;
  public pageSize = 5;
  public collectionSize!: number;
  public members!: ParticipantInterface[];
  /*
   ** MODAL
   */
  public closeResult!: string;
  public tempId!: string | number; // Participant Options
  public tempIndex!: number;

  constructor(
    private modalSvc: NgbModal,
    private messagesSvc: ValidationMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshQuizzes();
  }

  refreshQuizzes() {
    this.collectionSize = this.Participants.length; // Initialize to the pagination
    this.members = this.Participants.map((quiz, i) => ({
      id: i + 1,
      ...quiz,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  /**
   *
   * @param content : Any = Content of the modal.
   * @param id      : String | String = Id of the participant.
   * @param i       : Number = Index of the participant to remove.
   */
  openVerticallyCentered(content: any, id: number | string, i: number) {
    this.modalSvc.open(content, { centered: true });

    // Save in a temporal variable to send to the options.
    this.tempId = id;
    this.tempIndex = i;
  }

  removeParticipant(id: number | string) {
    // This to remove only in the Frontend
    this.Participants.splice(this.tempIndex, 1);

    // TODO: Call the method to remove participant in the backend.
    this.refreshQuizzes();
    this.modalSvc.dismissAll();
    this.messagesSvc.showMessage('Participant removed', 'Successfully', true);
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
