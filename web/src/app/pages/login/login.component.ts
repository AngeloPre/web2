import { LoginFormComponent } from '@/app/shared/components/login-form/login-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styles: `:host { display:block; flex: 1;   }`
})
export class LoginComponent {
}
