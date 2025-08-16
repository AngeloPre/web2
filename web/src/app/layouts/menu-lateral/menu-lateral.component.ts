import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router"

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './menu-lateral.component.html',
  styles: `:host { display:block; }`
})
export class MenuLateralComponent {

}
