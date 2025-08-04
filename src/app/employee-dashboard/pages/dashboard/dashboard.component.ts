import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../../auth/services/AuthService.service';
import { EmployeeCompanyProjectsComponent } from '../../components/employee-company-projects/employee-company-projects.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../../projects/services/project.service';

@Component({
  selector: 'app-dashboard',
  imports: [EmployeeCompanyProjectsComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  id = inject(AuthService).user()!.uid;
  employeeId = inject(AuthService).user()!.empleadoId;
  private employeeService = inject(EmployeeService);

  paginaActual = signal(1);
  totalElementos = signal(0);

  companiesResource = rxResource({
    request: () => ({
      employeeId: this.employeeId,
      numeroPagina: this.paginaActual(),
      tamanoPagina: 9,
    }),
    loader: ({ request }) => {
      return this.employeeService.getCompaniesByEmployeeId(
        request.employeeId!,
        request.numeroPagina,
        request.tamanoPagina
      );
    },
  });

  EmployeeResource = rxResource({
    request: () => ({
      employeeId: this.employeeId,
    }),
    loader: ({ request }) => {
      return this.employeeService.getEmployeeDashboardCounts(
        request.employeeId!
      );
    },
  });
}
