import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../interfaces/RespuestaEmpresas.interface';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/AuthService.service';

@Component({
  selector: 'app-company-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './company-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent {
  employeeRegister = environment.EMPLOYEE_REGISTER_URL;
  userId = inject(AuthService).user()?.uid;
  company = input.required<Empresa>();
}
