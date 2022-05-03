import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {

  users:any = [];

  constructor(private apiservice:ApiService) { }

  ngOnInit() {
    this.getUsersData();
  }

  getUsersData() {
    this.apiservice.getUsers()
    .subscribe(resp=>{
      console.log(resp.data);
      this.users = resp.data;
    })
  }

  deleteUser(id:any) {
    this.apiservice.deleteUser(id)
    .subscribe(resp=>{
      this.getUsersData();
      console.log(resp.message);
    })
  }

}
