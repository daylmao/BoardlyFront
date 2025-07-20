import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormValidators } from '../../../utils/form-validator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-activities',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateActivitiesComponent {
  private fb = inject(FormBuilder);
  private activitiesService = inject(ActivitiesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  validators = FormValidators;
  projectId: string | null = null;

  activityForm: FormGroup = this.fb.group({
    proyectoId: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    prioridad: [0, Validators.min(0)],
    descripcion: ['', Validators.required],
    estado: [0, Validators.min(0)],
    fechaInicio: [null, Validators.required],
    fechaFin: [null, Validators.required],
    orden: [0, Validators.min(0)],
  });

  ngOnInit() {
    this.projectId = this.route.snapshot.parent?.paramMap.get('projectId')!;
    this.activityForm.get('proyectoId')?.setValue(this.projectId);
  }

  onSubmit() {
    if (this.activityForm.invalid) return this.activityForm.markAllAsTouched();

    const formValue = {
      ...this.activityForm.value,
      fechaInicio: new Date(this.activityForm.value.fechaInicio).toISOString(),
      fechaFin: new Date(this.activityForm.value.fechaFin).toISOString(),
    };

    this.activitiesService.createActivity(formValue).subscribe(() => {
      toast.success('Actividad creada exitosamente!');
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }
}
