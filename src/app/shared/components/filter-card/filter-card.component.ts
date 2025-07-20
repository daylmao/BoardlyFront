import { JsonPipe, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter-card',
  imports: [RouterLink],
  templateUrl: './filter-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private location = inject(Location);

  title = input.required<string>();
  buttonName = input.required<string>();
  buttonRoute = input.required<string[]>();
  projects = input<number>();

  goBack() {
    this.location.back();
  }
}
