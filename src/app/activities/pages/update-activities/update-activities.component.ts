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
    fechaInicio: [0, Validators.required],
    fechaFin: [0, Validators.required],
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
