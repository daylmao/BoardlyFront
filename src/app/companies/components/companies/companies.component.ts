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

  actualPage = signal(1);
  totalElements = signal(0);

  totalPages = computed(() => this.companies.value()?.totalPaginas ?? 0);

  companies = rxResource({
    request: () => ({
      ceoId: this.authService.user()?.ceoId,
      numeroPagina: this.actualPage(),
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

  previousPage() {
    if (this.actualPage() > 1) {
      this.actualPage.update((n) => n - 1);
    }
  }

  nextPage() {
    if (this.actualPage() < this.totalPages()) {
      this.actualPage.update((n) => n + 1);
    }
  }
}
