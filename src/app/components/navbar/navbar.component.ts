import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public isCollapsed    : boolean = true;
  private lastPoppedUrl !: string | any;
  private yScrollStack  : any[] = [];
  public modalClose     !: NgbModalRef;
  public passwordForm   !: FormGroup;

  constructor(
    public location : Location,
    private router  : Router,
    private authSvc : AuthService,
    private modalSvc: NgbModal,
    private fb      : FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '#/home') {
      return true;
    } else {
      return false;
    }
  }


  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '#/documentation') {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authSvc.logOut();
  }

  /**
   * 
   * @param content: any - Content to render in the modal
   * @returns Open the modal
   */
  openModal(content: any) {
    this.modalClose = this.modalSvc.open(content, { centered: true });
    this.initPasswordForm();
  }

  // TODO: Validate confirm password
  /**
   * @returns Initialize the form
   */
  initPasswordForm() {
    this.passwordForm = this.fb.group({
      'currentPassword':  [ '', Validators.required],
      'newPassword'    :  [ '', Validators.required],
      'confirmPassword':  [ '', Validators.required]
    })
  }

  /**
   * @returns Change Password Message
   */
  changePassword() {

    if(this.passwordForm.invalid) {
      return Object.values(this.passwordForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    console.log(this.passwordForm.value);
    

  }

  /**
   * GETTERS FORMCONTROLS TO VALIDATIONS
   */
}