import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompanyService } from '../../services/Company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteCardComponent } from '../../../shared/components/delete-card/delete-card.component';

@Component({
  selector: 'app-delete-company',
  imports: [DeleteCardComponent],
  templateUrl: './delete-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeleteCompanyComponent {
  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  companyId = this.route.snapshot.params['id'];

  onDelete() {
    this.companyService.deleteCompany(this.companyId).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
