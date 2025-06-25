import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-layout',
  imports: [RouterOutlet],
  templateUrl: './employee-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeLayoutComponent {}
