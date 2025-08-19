import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterOutlet],
  templateUrl: './menu-lateral.component.html',
  styles: ``
})
export class MenuLateralComponent {
  showFiller = false;
}
