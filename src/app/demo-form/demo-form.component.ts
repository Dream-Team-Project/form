import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent implements OnInit {
  courses = ['Angular','ReactJs','VueJs','NodeJs','Laravel'];
  userModel = new User('Abhi','abhishek@dreamreflectionmedia.com',8687182377,'default');

  constructor(
    private apiservice: ApiService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      var userId = params.get('id');
      this.apiservice.getSingleUser(userId)
      .subscribe(resp=>{
        this.userModel = resp.data[0];
        console.log(this.userModel);
      })
    })
  }

  saveUser() {
    this.apiservice.saveUser(this.userModel)
    .subscribe(resp=>{
      this.router.navigate(['/users'],{relativeTo: this.route});
    },
    error=>{console.log(error)})
  }

}
