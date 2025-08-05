import { DatePipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  imports: [DatePipe],
  templateUrl: './task-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskViewComponent {
  private location = inject(Location);
  private boardService = inject(BoardService);
  private router = inject(ActivatedRoute);

  taskId = this.router.snapshot.paramMap.get('id');

  goBack() {
    this.location.back();
  }

  getFileName(fileUrl: string): string {
    if (!fileUrl) return 'Documento';

    try {
      const url = new URL(fileUrl);
      return url.pathname.split('/').pop() || 'Documento';
    } catch {
      return fileUrl.split('/').pop() || 'Documento';
    }
  }

  isImageFile(fileUrl: string): boolean {
    if (!fileUrl) return false;

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerCaseUrl = fileUrl.toLowerCase();

    return imageExtensions.some((ext) => {
      return lowerCaseUrl.endsWith(ext) || lowerCaseUrl.includes(ext);
    });
  }

  taskResource = rxResource({
    request: () => ({ taskId: this.taskId }),
    loader: ({ request }) => {
      return this.boardService.getTaskById(request.taskId!);
    },
  });
}
