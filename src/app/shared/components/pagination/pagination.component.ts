import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  totalItems = input(0);
  itemsPerPage = input(5);
  currentPage = input(1);

  pageChange = output<number>();

  get totalPages() {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageChange.emit(newPage);
  }

  nextPage() {
    this.changePage(this.currentPage() + 1);
  }

  previousPage() {
    this.changePage(this.currentPage() - 1);
  }
}
