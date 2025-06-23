import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  imports: [RouterLink],
  templateUrl: './cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {}
