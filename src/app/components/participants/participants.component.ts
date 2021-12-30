import { Component, Input, OnInit } from '@angular/core';

import { ParticipantInterface } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessageService } from 'src/app/services';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  /*
  ** ARRAY FROM PARENT COMPONENT
  */
  @Input() Participants: ParticipantInterface[] = [];  

  /*
  ** PAGINATION
  */
  public page = 1;
  public pageSize = 5;
  public collectionSize !: number;
  public quizzes!: ParticipantInterface[];

  public MyDate = new Date().toDateString();

  /*
  ** MODAL
  */
  public closeResult!: string;
  public tempId!: string | number; // Participant Options
  public tempIndex!: number;

  constructor(private modalSvc: NgbModal, private messagesSvc: ValidationMessageService) {
  }

  ngOnInit() {
    this.refreshQuizzes();
    console.log(this.MyDate);
  }

  refreshQuizzes() {
    this.collectionSize = this.Participants.length; // Initialize to the pagination    
    this.quizzes = this.Participants
    .map((quiz, i) => ({id: i + 1, ...quiz }))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
    console.log(`${id} stats...`);
    this.refreshQuizzes();
    this.modalSvc.dismissAll();
  }

}