import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-companies-layout',
  imports: [RouterOutlet],
  templateUrl: './companies-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesLayoutComponent {}
