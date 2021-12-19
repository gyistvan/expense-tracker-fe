import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthStateFacade } from 'src/app/store/auth/auth.facade';
import { LoginData } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: LoginData = new LoginData();

  public successfulRegistration: boolean = false;

  constructor(private authStateFacade: AuthStateFacade) {}

  ngOnInit(): void {}

  public onFormSubmit(form: FormGroup): void {
    if (form.valid) {
      this.authStateFacade.login(form.value);
    }
  }
}
