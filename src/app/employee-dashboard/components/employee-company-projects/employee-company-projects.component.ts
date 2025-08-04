import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Empresa } from '../../interfaces/CompanyEmployeeResponse.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-company-projects',
  imports: [DatePipe, RouterLink],
  templateUrl: './employee-company-projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCompanyProjectsComponent {
  project = input<Empresa>();

  get projectId(): string | undefined {
    return this.project()?.proyectoEmpresa.proyectoId;
  }
}
