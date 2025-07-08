import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';
import { CeoService } from '../../services/Ceo.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../shared/services/profile.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-ceo-profile',
  imports: [ProfileComponent, SpinnerComponent],
  templateUrl: './ceo-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CeoProfileComponent {
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  profileRoute = this.route.snapshot.params['id'];

  ceoResource = rxResource({
    request: () => ({ ceoId: this.profileRoute }),
    loader: ({ request }) => {
      return this.profileService.getUserDetails(request.ceoId);
    },
  });
}
