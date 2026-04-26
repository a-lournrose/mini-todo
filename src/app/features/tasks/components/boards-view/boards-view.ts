import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BoardComponent } from '@features/tasks/components/board/board';
import { Task } from '@features/tasks/model/tasks.models';

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.html',
  styleUrl: './boards-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BoardComponent],
})
export class BoardsViewComponent {
  public readonly todoTasks = input<Task[]>([]);
  public readonly inProgressTasks = input<Task[]>([]);
  public readonly completeTasks = input<Task[]>([]);
}
