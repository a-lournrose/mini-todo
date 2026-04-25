import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ValidationStatus } from '@shared/primitives/input/models/input.models';
import { LucideCheck, LucideDynamicIcon, LucideTriangleAlert } from '@lucide/angular';
import { TooltipDirective } from '@shared/primitives/tooltip/directives/tooltip.directive';

@Component({
  selector: 'app-input-validation-icon',
  templateUrl: './input-validation-icon.html',
  styleUrl: './input-validation-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideDynamicIcon, TooltipDirective],
})
export class InputValidationIconComponent {
  public readonly status = input.required<ValidationStatus>();
  public readonly errorText = input<string>('');
  public readonly showSuccess = input<boolean>(true);

  protected readonly icon = computed(() => {
    switch (this.status()) {
      case 'ERROR':
        return LucideTriangleAlert;
      case 'SUCCESS':
        if (!this.showSuccess()) return null;
        return LucideCheck;
      default:
        return null;
    }
  });
}
