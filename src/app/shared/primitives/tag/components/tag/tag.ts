import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagColor } from '@shared/primitives/tag/models/tag.models';
import { LucideDynamicIcon, LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideDynamicIcon],
})
export class TagComponent {
  public readonly text = input.required<string>();
  public readonly color = input<TagColor>('gray');
  public readonly icon = input<LucideIcon>();
}
