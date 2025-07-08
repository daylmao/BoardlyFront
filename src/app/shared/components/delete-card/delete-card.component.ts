import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-card',
  imports: [RouterLink],
  templateUrl: './delete-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCardComponent {
  title = input.required<string>();
  delete = output();

  onDelete() {
    this.delete.emit();
  }
}
