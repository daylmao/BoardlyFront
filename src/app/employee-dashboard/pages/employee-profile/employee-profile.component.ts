import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CeoService } from '../../../ceo-dashboard/services/Ceo.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';
import { ProfileService } from '../../../shared/services/profile.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-employee-profile',
  imports: [ProfileComponent, SpinnerComponent],
  templateUrl: './employee-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeProfileComponent {
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  profileRoute = this.route.snapshot.params['id'];

  employeeResource = rxResource({
    request: () => ({ employeeId: this.profileRoute }),
    loader: ({ request }) => {
      return this.profileService.getUserDetails(request.employeeId);
    },
  });
}
