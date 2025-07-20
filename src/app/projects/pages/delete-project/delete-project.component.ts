import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { DeleteCardComponent } from '../../../shared/components/delete-card/delete-card.component';

@Component({
  selector: 'app-delete-project',
  imports: [DeleteCardComponent],
  templateUrl: './delete-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeleteProjectComponent {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId = this.route.snapshot.params['id'];

  onDelete() {
    this.projectService.deleteActivity(this.projectId).subscribe(() => {
      toast.success('Proyecto eliminado exitosamente');
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }
}
