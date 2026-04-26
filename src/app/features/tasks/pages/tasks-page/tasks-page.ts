import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TabsComponent } from '@shared/primitives/tabs/components/tabs/tabs';
import { Tab } from '@shared/primitives/tabs/models/tabs.models';
import { BoardsViewComponent } from '@features/tasks/components/boards-view/boards-view';
import { ButtonDirective } from '@shared/primitives/button/directives/button.directive';
import { LucideDynamicIcon } from '@lucide/angular';
import { TasksService } from '@features/tasks/services/tasks.service';
import { Task } from '@features/tasks/model/tasks.models';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsComponent, BoardsViewComponent, ButtonDirective, LucideDynamicIcon],
})
export class TasksPageComponent implements OnInit {
  protected readonly views: Tab[] = [
    {
      title: 'Список',
      key: 'list',
    },
    {
      title: 'Доска',
      key: 'board',
    },
  ];

  protected readonly activeView = signal<string>('list');

  private readonly tasksService = inject(TasksService);

  protected readonly todoTasks = signal<Task[]>([]);
  protected readonly inProgressTasks = signal<Task[]>([]);
  protected readonly completeTasks = signal<Task[]>([]);

  ngOnInit(): void {
    this.tasksService.getAll().subscribe(({ todo, inProgress, complete }) => {
      this.todoTasks.set(todo);
      this.inProgressTasks.set(inProgress);
      this.completeTasks.set(complete);
    });
  }
}
