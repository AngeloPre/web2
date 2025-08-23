import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserRole } from '@core/store/user-role/user-role.store';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {
  readonly userRole = inject(UserRole);
}
