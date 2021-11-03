import { Component, OnInit } from '@angular/core';
import { Quiz, Quizzes } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public page = 1;
  public pageSize = 5;
  public collectionSize = Quizzes.length;
  public quizzes!: Quiz[];

  // Modal
  public closeResult!: string;
  public tempId!: string | number; // Participant Options

  constructor(private modalSvc: NgbModal, private toastSvc: ToastrService) {
    this.refreshQuizzes();
  }

  ngOnInit(): void {
  }

  refreshQuizzes() {
    this.quizzes = Quizzes
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openVerticallyCentered(content: any, id: number | string) {
    this.modalSvc.open(content, { centered: true });
    this.tempId = id;
  }

  removeParticipant(id: number | string) {
    console.log(`${id} removed...`);
    this.refreshQuizzes();
    this.modalSvc.dismissAll();
    this.toastSvc.success('Participant removed.', 'Successfully', {
      progressBar: true,
      timeOut: 1250
    });
  }

  viewResults(id: number | string) {
    console.log(`${id} stats...`);
    this.refreshQuizzes();
    this.modalSvc.dismissAll();
  }
}
