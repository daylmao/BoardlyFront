import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CompanyService } from '../../services/Company.service';
import { AuthService } from '../../../auth/services/AuthService.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { CompanyCardComponent } from '../company-card/company-card.component';

@Component({
  selector: 'app-companies',
  imports: [SpinnerComponent, RouterLink, CompanyCardComponent],
  templateUrl: './companies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent {
  private companyService = inject(CompanyService);
  private authService = inject(AuthService);

  paginaActual = signal(1);
  totalElementos = signal(0);

  totalPaginas = computed(() => this.cargarEmpresas.value()?.totalPaginas ?? 0);

  cargarEmpresas = rxResource({
    request: () => ({
      ceoId: this.authService.user()?.ceoId,
      numeroPagina: this.paginaActual(),
      tamanoPagina: 3,
    }),
    loader: ({ request }) => {
      return this.companyService.getEmpresasPaginadas(
        request.ceoId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
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
