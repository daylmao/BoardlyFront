import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { EmployeeTaskInfo } from '../../../employee-dashboard/interfaces/EmployeeTaskInfo.interface';

@Component({
  selector: 'app-employees-card',
  imports: [],
  templateUrl: './Employees-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesCardComponent {
  employee = input.required<EmployeeTaskInfo>();

  readonly assign = output<string>();

  onClickAssign() {
    this.assign.emit(this.employee().empleadoId);
  }
}
