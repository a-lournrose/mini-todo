import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AvatarComponent {
  public readonly username = input.required<string>();

  protected readonly shortName = computed(() => this.username()[0]);
}
