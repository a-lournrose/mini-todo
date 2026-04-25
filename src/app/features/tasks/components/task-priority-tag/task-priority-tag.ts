import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TaskPriority } from '@features/tasks/model/tasks.models';
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCalendar,
  LucideDynamicIcon,
  LucideMinus,
  LucideZap
} from '@lucide/angular';
import { TagComponent } from '@shared/primitives/tag/components/tag/tag';

@Component({
  selector: 'app-task-priority-tag',
  templateUrl: './task-priority-tag.html',
  styleUrl: './task-priority-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TagComponent, LucideDynamicIcon],
})
export class TaskPriorityTagComponent {
  public readonly key = input.required<TaskPriority>();

  protected readonly data = computed(() => {
    switch (this.key()) {
      case 'low':
        return {
          icon: LucideArrowDown,
          color: '#3B82F6',
          text: 'Низкий',
        };
      case 'medium':
        return {
          icon: LucideMinus,
          color: '#F59E0B',
          text: 'Средний',
        };
      case 'high':
        return {
          icon: LucideArrowUp,
          color: '#EF4444',
          text: 'Высокий',
        };
      case 'critical':
        return {
          icon: LucideZap,
          color: '#6366F1',
          text: 'Критичный',
        };
    }
  });
  protected readonly LucideCalendar = LucideCalendar;
}
