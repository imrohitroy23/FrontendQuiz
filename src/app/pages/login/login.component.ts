import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  }

  constructor(private snack: MatSnackBar, private login: LoginService, private router:Router) {}
  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('username not given', 'ok')
      return
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password not given', 'ok')
      return
    }
    //server request to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {

        console.log(data)

        //login...
        this.login.loginUser(data.token)
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user)
          console.log(user)
          // redirecting admin
          //redirect login
          if (this.login.getUserRole() == 'Admin') {
            this.router.navigate(['admin'])
            //window.location.href = '/admin'
          } else if (this.login.getUserRole() == 'normal') {
            this.router.navigate(['user-dashboard/0'])
            //window.location.href = '/user-dashboard'
          } else {
            this.login.logout()
          }
        })
      },
      (error) => {
        //error
        console.log('Error!')
        console.log(error)
        this.snack.open('Invalid details ', 'ok')
      },
    )
  }

}
