import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-wrapper-landing-page',
  imports: [RouterLink],
  templateUrl: './wrapper-landing-page.component.html',
  styles: ``
})
export class WrapperLandingPageComponent {

  mobileOpen = false;
  toggleMobile() { this.mobileOpen = !this.mobileOpen; }
}
