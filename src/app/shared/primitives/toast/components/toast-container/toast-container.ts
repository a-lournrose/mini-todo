import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '@shared/primitives/toast/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);
}
