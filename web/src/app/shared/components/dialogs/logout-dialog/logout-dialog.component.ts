import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '@/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logout-dialog.component.html',
  styles: ``
})
export class LogoutDialogComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  constructor(private ref: MatDialogRef<LogoutDialogComponent>) { }

  fazerLogout(): void {
    this.loginService.logout();
    setTimeout(() => {
      this.ref.close(true);
      this.router.navigate(['/']);
    }, 400);
  }
}
