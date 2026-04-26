import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagComponent } from '@shared/primitives/tag/components/tag/tag';
import { LucideCalendar, LucideDynamicIcon } from '@lucide/angular';
import { TaskPriorityTagComponent } from '@features/tasks/components/task-priority-tag/task-priority-tag';
import { Task } from '@features/tasks/model/tasks.models';
import { FormatDatePipe } from '@shared/pipes/format-date.pipe';

@Component({
  selector: 'app-board-task-item',
  templateUrl: './board-task-item.html',
  styleUrl: './board-task-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TagComponent, TaskPriorityTagComponent, LucideDynamicIcon, FormatDatePipe],
})
export class BoardTaskItemComponent {
  public readonly item = input.required<Task>();

  protected readonly LucideCalendar = LucideCalendar;
}
