import { LoginFormComponent } from '@shared/components/login-form/login-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styles: `:host { display:flex; flex: 1; justify-content: end; }`
})
export class LoginComponent {
}
