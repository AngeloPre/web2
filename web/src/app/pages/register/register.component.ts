import { RegisterFormComponent } from '@/app/shared/components/register-form/register-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styles: `:host { display:flex; flex: 1; justify-content: end; }`
})
export class RegisterComponent {

}
