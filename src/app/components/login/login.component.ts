import { Component, inject } from '@angular/core';
import UserLogin from '../../models/user-login';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConnectorService } from '../../services/connector.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userForms: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(''),
    ]),
  });

  loginObj: UserLogin;

  loggedInObj: any;
  constructor(
    private toastr: ToastrService,
    private connector: ConnectorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginObj = new UserLogin('', '');
  }

  loginHandler() {
    console.log('here 1');
    if (this.userForms.valid) {
      this.toastr.info('Logging in....', 'Please Wait');
      console.log('here 2');

      this.loginObj = new UserLogin(
        this.userForms.get('email')?.value,
        this.userForms.get('password')?.value
      );
      console.log('here 3');

      this.connector.doLogin(this.loginObj).subscribe(
        (val) => {
          console.log('here 4');
          this.loggedInObj = val;
          console.log(
            'here sir ' + this.loggedInObj.Message,
            this.loggedInObj.Token
          );
          this.authService.setToken(this.loggedInObj.Token);
          const role = this.authService.getUserRole();
          if (role == 'USER') {
            this.toastr.success('Logged in successfully as User', 'Success');
            this.router.navigateByUrl('/flight');
          } else {
            this.toastr.success('Logged in successfully as Admin', 'Success');
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error) => {
          if (error.status == '403') {
            this.toastr.error('Invalid credentials', 'Login Error');
          } else {
            this.toastr.error(
              'Failed to login. Please try again later.',
              'Error'
            );
          }
        }
      );
      console.log(this.loggedInObj);
    } else {
      this.toastr.error('Please fill all the fields');
    }
  }
  signInHander(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/signup');
  }
}
