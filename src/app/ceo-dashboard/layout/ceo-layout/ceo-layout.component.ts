import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ceo-layout',
  imports: [RouterOutlet],
  templateUrl: './ceo-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CeoLayoutComponent {}
