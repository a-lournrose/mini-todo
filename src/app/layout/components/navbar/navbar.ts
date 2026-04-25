import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AvatarComponent } from '@shared/primitives/avatar/components/avatar/avatar';
import { LucideChevronRight, LucideDynamicIcon, LucidePlusSquare } from '@lucide/angular';
import { ButtonDirective } from '@shared/primitives/button/directives/button.directive';
import { LogoutButtonComponent } from '@features/auth/components/logout-button/logout-button';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AvatarComponent, LucideDynamicIcon, ButtonDirective, LogoutButtonComponent],
})
export class NavbarComponent {
  protected readonly LucideChevronRight = LucideChevronRight;
  protected readonly LucidePlusSquare = LucidePlusSquare;

  private readonly userService = inject(UserService);

  protected readonly username = computed(() => this.userService.getUserInfo()?.username ?? '');
}
