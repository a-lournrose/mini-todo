import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from '@features/auth/components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RegisterFormComponent],
})
export class RegisterPageComponent {}
