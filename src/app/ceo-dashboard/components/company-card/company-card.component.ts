import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../interfaces/RespuestaEmpresas.interface';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-company-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './company-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent {
  employeeRegister = environment.EMPLOYEE_REGISTER_URL;
  company = input.required<Empresa>();
}
