import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CeoDashboardCounts } from '../../Interfaces/CeoDashboardCounts.interface';

@Component({
  selector: 'app-ceo-stats',
  imports: [],
  templateUrl: './ceo-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CeoStatsComponent {
  ceoStats = input.required<CeoDashboardCounts>();
}
