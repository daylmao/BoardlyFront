import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CompanyService } from '../../services/Company.service';
import { AuthService } from '../../../auth/services/AuthService.service';
import { CeoService } from '../../services/Ceo.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [SpinnerComponent, CompanyCardComponent, RouterLink],
  templateUrl: './Companies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent {
  private companyService = inject(CompanyService);
  private userId = inject(AuthService).user()?.uid;
  private ceoService = inject(CeoService);

  paginaActual = signal(1);
  ceoId = toSignal(this.ceoService.getCeoId(this.userId!));
  totalElementos = signal(0);

  totalPaginas = computed(() => this.cargarEmpresas.value()?.totalPaginas ?? 0);

  cargarEmpresas = rxResource({
    request: () => {
      const ceoId = this.ceoId();
      const pagina = this.paginaActual();
      this.totalElementos();
      if (!ceoId) return;
      return {
        ceoId,
        paginaActual: pagina,
        elementos: 3,
      };
    },
    loader: ({ request }) =>
      this.companyService
        .getEmpresasPaginadas(
          request!.ceoId,
          request!.paginaActual,
          request!.elementos
        )
        .pipe(
          tap((response) => {
            this.totalElementos.set(response.totalElementos);
          })
        ),
  });

  paginaAnterior() {
    if (this.paginaActual() > 1) {
      this.paginaActual.update((n) => n - 1);
    }
  }

  paginaSiguiente() {
    if (this.paginaActual() < this.totalPaginas()) {
      this.paginaActual.update((n) => n + 1);
    }
  }
}
