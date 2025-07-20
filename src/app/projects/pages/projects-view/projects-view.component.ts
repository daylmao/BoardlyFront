import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FilterComponent } from '../../../shared/components/filter-card/filter-card.component';

@Component({
  selector: 'app-projects-view',
  imports: [ProjectCardComponent, SpinnerComponent, FilterComponent],
  templateUrl: './projects-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsViewComponent {
  private router = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  companyId: string = this.router.snapshot.paramMap.get('companyId')!;

  paginaActual = signal(1);
  totalElementos = signal(0);

  projectResource = rxResource({
    request: () => ({
      id: this.companyId,
      numeroPagina: this.paginaActual(),
      tamanoPagina: 9,
    }),
    loader: ({ request }) => {
      return this.projectService.getProjectsPagination(
        request.id,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });
}
