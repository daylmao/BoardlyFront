import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board-layout',
  imports: [RouterOutlet],
  templateUrl: './board-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardLayoutComponent {}
