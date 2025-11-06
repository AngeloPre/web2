import { Login } from '@/app/model/login';
import { LoginService } from '@/app/services/login.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserRole } from '@core/store/user-role/user-role.store';

@Component({
  selector: 'app-login-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private loginService = inject(LoginService);
  email = '';
  password = '';

  performLogin(): void {
    const login: Login = {
      email: this.email,
      password: this.password,
    };
    this.loginService.inserir(login);
    console.log('Tentei fazer login...');
  }

  readonly userRole = inject(UserRole);
}
