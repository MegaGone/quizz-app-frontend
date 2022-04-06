import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public User!: IUser;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.authSvc.getSession().subscribe(res => {
      if(res != undefined) {
        this.User = res;
        console.log(this.User);
      }
    })
  }
}
