import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivitiesService } from '../../../activities/services/activities.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormValidators } from '../../../utils/form-validator';
import { Location } from '@angular/common';
import { toast } from 'ngx-sonner';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-update-project',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateProjectComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  validators = FormValidators;
  projectId = this.route.snapshot.params['id'];
  location = inject(Location);

  updateProjectForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.updateProjectForm.invalid) {
      return this.updateProjectForm.markAllAsTouched();
    }

    this.projectService
      .updateProject(this.projectId, this.updateProjectForm.value)
      .subscribe(() => {
        toast.success('Proyecto actualizado exitosamente!');
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
