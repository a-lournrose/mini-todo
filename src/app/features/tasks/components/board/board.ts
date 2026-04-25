import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BoardTaskItemComponent } from '@features/tasks/components/board-task-item/board-task-item';
import { Task } from '@features/tasks/model/tasks.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BoardTaskItemComponent],
})
export class BoardComponent {
  public readonly title = input.required<string>();
  public readonly tasks = input<Task[]>([]);
}
