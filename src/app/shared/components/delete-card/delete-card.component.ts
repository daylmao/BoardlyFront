import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
  private location = inject(Location);
  title = input.required<string>();
  delete = output();

  onDelete() {
    this.delete.emit();
  }

  goBack() {
    this.location.back();
  }
}
