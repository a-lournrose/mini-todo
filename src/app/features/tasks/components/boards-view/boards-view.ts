import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardComponent } from '@features/tasks/components/board/board';

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.html',
  styleUrl: './boards-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BoardComponent],
})
export class BoardsViewComponent {}
