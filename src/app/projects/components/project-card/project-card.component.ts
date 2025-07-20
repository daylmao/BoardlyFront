import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  Project,
  ProjectResponse,
} from '../../interfaces/project-response.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  project = input.required<Project>();
}
