import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-nav',
  imports: [RouterLink],
  templateUrl: './landing-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
