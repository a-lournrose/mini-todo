import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TabsComponent } from '@shared/primitives/tabs/components/tabs/tabs';
import { Tab } from '@shared/primitives/tabs/models/tabs.models';
import { BoardsViewComponent } from '@features/tasks/components/boards-view/boards-view';
import { ButtonDirective } from '@shared/primitives/button/directives/button.directive';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsComponent, BoardsViewComponent, ButtonDirective, LucideDynamicIcon],
})
export class TasksPageComponent {
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
}
