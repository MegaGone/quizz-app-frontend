import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, AuthService, ValidationMessageService, PlayService } from 'src/app/services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGetQuizByCodeResponse, IUser } from 'src/app/interfaces';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed    : boolean = true;
  public modalClose     !: NgbModalRef;
  public passwordForm   !: FormGroup;
  public submitted      !: boolean;
  public User           !: IUser;
  public toggle         !: boolean;
  public innerWidth: any;
  public passRegex      !: RegExp;
  public playForm       !: FormGroup;

  constructor(
    public location: Location,
    private authSvc: AuthService,
    private modalSvc: NgbModal,
    private fb: FormBuilder,
    private userSvc: UserService,
    private msgSvc: ValidationMessageService,
    private playSvc: PlayService,
    private router: Router
  ) {
    this.passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth == 991) {
      this.toggle = true;
    }
  }

  /**
   * @returns LogOut
   */
  logOut() {
    this.authSvc.logOut();
  }

  /**
   *
   * @param content: any - Content to render in the modal
   * @returns Open the modal
   */
  openModal(content: any, flag: 'password' | 'play') {
    this.modalClose = this.modalSvc.open(content, { centered: true });

    if (flag == 'password') {
      this.submitted = false;
      return this.initPasswordForm();
    } else if (flag == 'play') {
      return this.initPlayForm();
    }

  }

  /**
   * Init play quiz form
   */
  initPlayForm(): void {
    this.playForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]]
    })
  }

  /**
   * @returns Initialize the form
   */
  initPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.pattern(this.passRegex)]],
      newPassword: ['', [Validators.required, Validators.pattern(this.passRegex)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validators: [this.MustMatch('newPassword', 'confirmPassword')],
      });
  }

  /**
   * @returns Change Password Message
   */
  changePassword() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return Object.values(this.passwordForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const { currentPassword, confirmPassword: newPassword } =
      this.passwordForm.value;

    this.userSvc.changePassword(currentPassword, newPassword).subscribe(
      (res) => {
        this.modalClose.close();
        return this.msgSvc.showMessage(`${res}`, 'UPDATED', true);
      },
      (err) => {
        if (err.status === 400) {
          const splited = err.error.split(':');
          return this.msgSvc.showMessage(
            `${splited[0]}`,
            `${splited[1]}`,
            false
          );
        }

        return this.msgSvc.showMessage('ERROR', 'To change password', false);
      }
    );
  };

  /**
   * @returns Play Quiz 
   */
  playQuiz() {
    if (this.playForm.invalid) {
      return Object.values(this.playForm.controls).forEach((control) => {
        control.markAsTouched()
      })
    }

    const { code } = this.playForm.value;

    this.playSvc.getQuizByCode(code).subscribe(
      (res: IGetQuizByCodeResponse) => {

        if (res.quizDB) {
          this.modalClose.close();
          this.playSvc.currentQuizBehavor.next(res.quizDB);
          this.joinToQuiz(code);
        }

      },
      err => {
        this.modalClose.close();
        return this.msgSvc.showMessage('ERROR', 'Error to play quiz', false);
      }
    )

  }

  /**
   * @returns - User Details
   */
  getUserDetails() {
    this.authSvc.getSession().subscribe((res) => {
      if (res != undefined) {
        this.User = res;
      }
    });
  }

  /**
   *
   * @param controlName - First control to match
   * @param matchingControlName - Control to compare first control
   * @returns NUll if its OK, but it's worst returns MustMatch = true
   */
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * 
   * @param code: string - Quiz code to join
   */
  joinToQuiz(code: string) {
    this.playSvc.joinToQuiz(code).subscribe(
      (res: IGetQuizByCodeResponse) => {
        if (res.Ok && res.message == "Joined" && res.player) {
          this.playSvc.currentGuestPlayerBehavor.next(res.player);
          return this.router.navigate(['/play/questions']);
        }
        return;
      },
      (err: any) => {
        console.log(err);
        return this.msgSvc.showMessage('ERROR', 'Error to join to quiz', false);
      }
    )
  }

  /**
   * GETTERS FORMCONTROLS TO VALIDATIONS
   */

  // Get the form reference
  get f() {
    return this.passwordForm.controls;
  }

  // Current Password reference
  get currentPass() {
    return this.passwordForm.get('currentPassword')?.invalid && this.passwordForm.get('currentPassword')?.touched;
  }

  // New Password reference
  get newPass() {
    return this.passwordForm.get('newPassword')?.invalid && this.passwordForm.get('newPassword')?.touched
  }

  // Confirm Password reference
  get confirmPass() {
    return this.passwordForm.get('confirmPassword')?.invalid && this.passwordForm.get('confirmPassword')?.touched;
  }

  // Play form reference
  get p() {
    return this.playForm.controls;
  }

  // Code reference
  get code() {
    return this.playForm.get('code')?.invalid && this.playForm.get('code')?.touched;
  }

  closeNavbar() {
    if (this.isCollapsed) {
      this.isCollapsed = false
    } else {
      this.isCollapsed = true
    }
  }
}
