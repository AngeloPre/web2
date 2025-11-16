import { Login } from '@/app/model/login';
import { LoginService } from '@/app/services/login.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  readonly userRole = inject(UserRole);
  email = '';
  password = '';

  performLogin(): void {
    const login: Login = {
      email: this.email,
      password: this.password,
    };
    this.loginService.login(login).subscribe({
      next: () => {
        this.snack.open('Login bem sucessido', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-success'],
        });
        this.router.navigate([this.userRole.dashboardPath()]);
      },
      error: () => {
        this.snack.open('Login ou senha incorretos', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-danger'],
        });
      },
    });
    //console.log('Tentei fazer login...');
  }
}
