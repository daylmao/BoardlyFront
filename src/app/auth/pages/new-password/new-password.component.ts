import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-new-password',
  imports: [],
  templateUrl: './new-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewPasswordComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
