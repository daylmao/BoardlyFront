import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent { }
