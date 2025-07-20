import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeleteCardComponent } from '../../../shared/components/delete-card/delete-card.component';
import { ActivitiesService } from '../../services/activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-delete-activities',
  imports: [DeleteCardComponent],
  templateUrl: './delete-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeleteActivitiesComponent {
  private activitiesService = inject(ActivitiesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activityId = this.route.snapshot.params['id'];

  onDelete() {
    this.activitiesService.deleteActivity(this.activityId).subscribe(() => {
      toast.success('Actividad eliminada exitosamente');
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }
}
