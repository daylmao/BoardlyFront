import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { FormValidators } from '../../../utils/form-validator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Location } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-activities',
  imports: [ReactiveFormsModule],
  templateUrl: './update-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateActivitiesComponent {
  private fb = inject(FormBuilder);
  private activitiesService = inject(ActivitiesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  validators = FormValidators;
  activityId = this.route.snapshot.params['id'];
  location = inject(Location);

  updateActivityForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    estado: [0, Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
  });

  activityResource = rxResource({
    request: () => ({
      activityId: this.activityId,
    }),
    loader: ({ request }) => {
      return this.activitiesService.getActivities(request.activityId!);
    },
  });

  private _loadData = this.activitiesService
    .getActivities(this.activityId)
    .pipe(
      map((activity) => {
        const formatDate = (dateString?: string) =>
          dateString ? dateString.split('T')[0] : '';

        return {
          ...activity,
          fechaInicio: formatDate(activity.fechaInicio),
          fechaFin: formatDate(activity.fechaFin),
        };
      })
    )
    .subscribe((activity) => {
      this.updateActivityForm.patchValue(activity);
    });

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.updateActivityForm.invalid) {
      return this.updateActivityForm.markAllAsTouched();
    }
    const formValue = {
      ...this.updateActivityForm.value,
      fechaInicio: new Date(
        this.updateActivityForm.value.fechaInicio
      ).toISOString(),
      fechaFin: new Date(this.updateActivityForm.value.fechaFin).toISOString(),
    };
    this.activitiesService
      .updateActivity(this.activityId, formValue)
      .subscribe(() => {
        toast.success('Actividad actualizada exitosamente!');
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
