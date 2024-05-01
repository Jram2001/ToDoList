  import { Component, inject } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
  import { SharedService } from '../Sevices/shared.service';
  import { RouterModule } from '@angular/router';
  @Component({
    selector: 'app-signin',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule,RouterModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss'
  })
  export class SigninComponent {
    constructor(private router: Router) {}
    sharedService = inject(SharedService)
    UserData = new FormGroup({
      UserName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    Login(){
      if(this.UserData.valid == true){
      this.sharedService.login(this.UserData.value).subscribe( (x:any) => 
        {
          localStorage.setItem('Token' , x?.accessToken); 
          localStorage.setItem('user' , x?.user);
          localStorage.setItem('UserID' , x?.userId);
          this.router.navigate(['/home'])
        });
      }else{
        console.error(' Enter valid details ')
      }
    }
    createAccount(){
        this.sharedService.CreateUser(this.UserData.value).subscribe( (x:any) => console.log(x));
    }
    ngAfterViewInit(){
      localStorage.clear();
      console.log(localStorage)
    }
  }
