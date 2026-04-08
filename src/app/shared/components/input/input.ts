import { Component, computed, input, signal } from '@angular/core';
import { LucideDynamicIcon, LucideEye, LucideEyeOff } from '@lucide/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type InputType = 'text' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  standalone: true,
  imports: [LucideDynamicIcon, ReactiveFormsModule],
})
export class InputComponent {
  public readonly label = input<string>('');
  public readonly type = input<InputType>('text');
  public readonly control = input.required<FormControl<string>>();

  protected readonly passwordVisibility = signal<boolean>(false);
  protected readonly isPasswordType = computed(() => this.type() === 'password');

  protected togglePasswordVisibility(): void {
    this.passwordVisibility.update((v) => !v);
  }

  protected readonly toggleIcon = computed(() =>
    this.passwordVisibility() ? LucideEyeOff : LucideEye,
  );
  protected readonly currentType = computed(() => this.isPasswordType() && this.passwordVisibility() ? 'text' : this.type());

  protected readonly inputClass = computed(() =>
    this.isPasswordType() ? 'input input--with-action' : 'input',
  );
}
