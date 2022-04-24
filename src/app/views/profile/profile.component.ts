import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { AuthService, UserService, ValidationMessageService } from 'src/app/services';
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
  public fileUploaded!: File;
  public extentionsAllowed!: string[];
  public validFile: boolean;

  constructor(private authSvc: AuthService, private userSvc: UserService, private modalSvc: NgbModal, private fb: FormBuilder, private msgSvc: ValidationMessageService) { 
    this.editName = false;
    this.extentionsAllowed = ['png', 'jpg', 'jpeg', 'gif'];
    this.validFile = false;
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

  /**
   * 
   * @param content : any - Content to show in modal
   */
  openModal(content: any, flag: 'delete' | 'update') {

    if(flag == 'update') {
      this.editName = false;
      this.loadUserData(this.User)
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
      'google'  : [ '' , Validators.required],
      'image'   : [ '' ]
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
      'google'  : user.google,
      'image'   : ''
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

    const { uid, name } = this.userForm.value;
    this.userSvc.updateUserv2(this.fileUploaded, uid, name).subscribe(res => {
      console.log(res);
    })

    // this.userSvc.updateUser(this.userForm.value).subscribe(
    //   res => {
    //     const { name } = this.userForm.value;
    //     this.modalClose.close();
    //     this.User.name = name;
    //     return this.msgSvc.showMessage('SETTINGS CHANGED', 'UPDATED', true);
    //   },
    //   err => {
    //     console.log(err);
    //     return this.msgSvc.showMessage('ERROR TO UPDATE', 'ERROR', false);
    //   }
    // )
  }

  get f() {
    return this.userForm.controls;
  }

  get imageRef() {
    return this.userForm.get('image');
  }

  changeFile($event: any) {

    const file: File = $event.target.files[0];
    
    if (file != undefined || file) {
      
      const { name } = file;
      const splited : string[] = name.split('.');
      const ext     : string   = splited[splited.length - 1];
      
      if (!this.extentionsAllowed.includes(ext)) {
        this.validFile = false;
        return this.userForm.get('image')?.setErrors({ invalidFile: true });
      } else {
        this.validFile = true;
        this.userForm.updateValueAndValidity();
        this.fileUploaded = file;
        console.log(this.fileUploaded);
      }
    }

  }

}
