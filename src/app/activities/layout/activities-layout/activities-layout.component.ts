import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-activities-layout',
  imports: [RouterOutlet],
  templateUrl: './activities-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesLayoutComponent {}
