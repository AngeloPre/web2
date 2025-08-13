import { Component } from "@angular/core"
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router"

@Component({
	selector: "app-shell",
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive
  ],
	template: `
    <main class="p-6">
        <div>Alguma coisa no shell</div>
        <router-outlet />
    </main>
  `,
	styles: `
    :host { display:block; }
  `,
})
export class ShellComponent {}
