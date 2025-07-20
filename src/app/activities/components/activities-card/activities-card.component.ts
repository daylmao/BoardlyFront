import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Activities } from '../../interfaces/activities-response.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './activities-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesCardComponent {
  activities = input.required<Activities>();
}
