import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegistration } from '../../models/user-registration';
import { ToastrService } from 'ngx-toastr';
import { ConnectorService } from '../../services/connector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userForms: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/
      ),
    ]),
    phone: new FormControl('', [Validators.required]),
    //role : new FormControl('',[Validators.required]),
  });

  registeredObject: any;
  registerObj: UserRegistration;
  constructor(
    private toastr: ToastrService,
    private connector: ConnectorService,
    private router: Router
  ) {
    this.registerObj = new UserRegistration('', '', '', '');
  }
  submitHandler() {
    if (this.userForms.valid) {
      this.toastr.info('Signing up....', 'Please Wait');
      this.registerObj = new UserRegistration(
        this.userForms.get('username')?.value,
        this.userForms.get('email')?.value,
        this.userForms.get('password')?.value,
        this.userForms.get('phone')?.value
      );
      this.connector.doSignUp(this.registerObj).subscribe(
        (val) => {
          this.toastr.success(
            'You have been successfully signed up....',
            'Please Log in'
          );
          this.registeredObject = val;
          console.log(this.registeredObject);
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
      this.router.navigateByUrl('/login');
    } else {
      if (this.userForms.get('username')?.invalid) {
        this.toastr.error('Username must be alteast 5 characters');
      }
      if (this.userForms.get('email')?.invalid) {
        this.toastr.error('Please give a valid email');
      }
      if (this.userForms.get('password')?.invalid) {
        this.toastr.error('Password isnt strong enough');
      }
    }
  }
}
