import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wrapper-login-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule],
  templateUrl: './wrapper-login-register.component.html',
  styles: ``
})
export class WrapperLoginRegisterComponent {

}
