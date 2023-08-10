import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService,private snack:MatSnackBar ) {}
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }
  ngOnInit(): void {}
  formSubmit() {
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null){
      this.snack.open("user is required",'ok');
      return;
    }
    if(this.user.password==''|| this.user.password==null){
      this.snack.open("password is required",'ok');
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data)
        Swal.fire('Success','User registered and user id is '+data.id,'success');     
      },
      (error)=>{
        //error
        this.snack.open("something went wrong",'ok')
      }
    )
  }

}
