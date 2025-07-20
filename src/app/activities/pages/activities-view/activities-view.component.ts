import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivitiesCardComponent } from '../../components/activities-card/activities-card.component';
import { FilterComponent } from '../../../shared/components/filter-card/filter-card.component';
import { ActivitiesService } from '../../services/activities.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-activities-view',
  imports: [ActivitiesCardComponent, FilterComponent, SpinnerComponent],
  templateUrl: './activities-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivitiesViewComponent {
  private activitiesService = inject(ActivitiesService);
  private router = inject(ActivatedRoute);

  projectId: string = this.router.snapshot.paramMap.get('projectId')!;

  paginaActual = signal(1);
  totalElementos = signal(0);

  activitiesResource = rxResource({
    request: () => ({
      id: this.projectId,
      numeroPagina: this.paginaActual(),
      tamanoPagina: 22,
    }),
    loader: ({ request }) => {
      return this.activitiesService.getActivitiesPaginated(
        request.id,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });
}
