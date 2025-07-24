import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-task',
  imports: [],
  templateUrl: './create-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateTaskComponent {}
