import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { Tab } from '@shared/primitives/tabs/models/tabs.models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TabsComponent {
  public readonly items = input.required<Tab[]>();
  public readonly activeTab = model.required<string>();

  protected selectTab(key: string): void {
    this.activeTab.set(key);
  }
}
