import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { AuthService, UserService } from 'src/app/services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public User!: IUser;
  public modalClose!: NgbModalRef;
  public editName: boolean;
  public userForm!: FormGroup;
  public passwordForm!: FormGroup;

  constructor(private authSvc: AuthService, private userSvc: UserService, private modalSvc: NgbModal, private fb: FormBuilder) { 
    this.editName = false;
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.initUserForm();
  }

  /**
   * @returns - User Details
   */
  getUserDetails() {
    this.authSvc.getSession().subscribe(res => {
      if(res != undefined) {
        this.User = res;
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

  /**
   * 
   * @param content : any - Content to show in modal
   */
  openModal(content: any, flag: 'delete' | 'update' | 'password') {

    if(flag == 'update') {
      this.editName = false;
      this.loadUserData(this.User)
    }

    if(flag == 'password') {
      
    }

    this.modalClose =  this.modalSvc.open(content, { centered: true});
  }

  /**
   * Initialize user form
   */
  initUserForm() {
    this.userForm = this.fb.group({
      'uid'     : [ '' , Validators.required],
      'email'   : [ '' , Validators.required],
      'name'    : [ '' , Validators.required],
      'google'  : [ '' , Validators.required]
    })
  }

  /**
   * 
   * @param user: IUser - User to set data
   * @returns Set data to the form
   */
  loadUserData(user: IUser) {
    this.userForm.patchValue({
      'uid'     : user.uid,
      'email'   : user.email,
      'name'    : user.name,
      'google'  : user.google
    })
  }

  /**
   * 
   * @returns Update User
   */
  updateUser() {
    if(this.userForm.invalid) {
      return Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    console.log(this.userForm);
  }
}
