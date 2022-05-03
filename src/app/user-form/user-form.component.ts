import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user';
import { ApiService } from '../api.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  
  courses = ['Angular','React','VueJs','NodeJs','Laravel'];
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: [''],
    phone: [],
    course: [''],
  });
  // userForm = new FormGroup({
  //   name: new FormControl(),
  //   email: new FormControl(),
  //   phone: new FormControl(),
  //   course: new FormControl(),
  // });
 userId:any = '';
 
  constructor(
    private apiservice: ApiService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.userId = params.get('id');
  })
}

  ngAfterViewInit() {
      if(this.userId) {
          this.apiservice.getSingleUser(this.userId)
          .subscribe(resp=>{
            this.userForm.patchValue(resp.data[0]);
          })
      }
  }

  saveUser() {
    this.apiservice.saveUser(this.userForm.value)
    .subscribe(resp=>{
      this.router.navigate(['/users'],{relativeTo: this.route});
    },
    error=>{console.log(error)})
  }

  updateUser() {
    console.log(this.userForm.value);
    this.apiservice.updateUser(this.userForm.value, this.userId)
    .subscribe(resp=>{
      this.router.navigate(['/users'],{relativeTo: this.route});
    },
    error=>{console.log(error)})
  }

}
