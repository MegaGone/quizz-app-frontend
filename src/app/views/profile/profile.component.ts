import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { AuthService, UserService } from 'src/app/services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public User!: IUser;
  public modalClose!: NgbModalRef;

  constructor(private authSvc: AuthService, private userSvc: UserService, private modalSvc: NgbModal) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  /**
   * @returns - User Details
   */
  getUserDetails() {
    this.authSvc.getSession().subscribe(res => {
      if(res != undefined) {
        this.User = res;
        console.log(this.User);
        
      }
    })
  }

  /**
   *  @returns Delete profile user
   */
  deleteProfile() {
    if(this.User != undefined || this.User != {}) {
      this.userSvc.deleteUser(this.User.uid).subscribe(res => {
        console.log(res);
      })
    }
  }

  openModal(content: any) {

    this.modalClose =  this.modalSvc.open(content, { centered: true});

  }
}
