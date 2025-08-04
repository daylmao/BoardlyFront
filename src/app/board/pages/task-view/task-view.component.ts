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

  taskResource = rxResource({
    request: () => ({ taskId: this.taskId }),
    loader: ({ request }) => {
      return this.boardService.getTaskById(request.taskId!);
    },
  });
}
