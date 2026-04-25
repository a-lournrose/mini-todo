import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonDirective } from '@shared/primitives/button/directives/button.directive';
import { LucideDynamicIcon, LucideLogOut } from '@lucide/angular';
import { TokenService } from '@core/services/token.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/routes.constants';

@Component({
  selector: 'app-logout-button',
  imports: [ButtonDirective, LucideDynamicIcon],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LogoutButtonComponent {
  protected readonly LucideLogOut = LucideLogOut;

  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  protected logout() {
    this.tokenService.clear();
    void this.router.navigate([APP_ROUTES.auth.login]);
  }
}
