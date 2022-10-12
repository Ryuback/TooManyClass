import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../../environments/environment';
import { ClassService } from '../../../../services/class/class.service';
import { PopoverController } from '@ionic/angular';
import { Task } from 'src/app/shared/model/task/task.model';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskPage implements OnInit {
  form: FormGroup;
  @Input() task: Task;

  constructor(private fb: FormBuilder,
              private classService: ClassService,
              private cdr: ChangeDetectorRef,
              private popoverController: PopoverController,
              private toastService: ToastService,
              private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.task?.title],
      description: [this.task?.description]
    });
  }

  async submit() {
    if (this.task) {
      const task = {
        ...this.task,
        ...this.form.value
      };
      this.http.post(`${api}/task/${this.task._id}/editTask`, task).subscribe();
      await this.popoverController.dismiss(task);
      this.toastService.showToast('Tarefa atualizada', 'success');
    } else {
      this.http.post(`${api}/task`, {
        // eslint-disable-next-line no-underscore-dangle
        classId: this.classService.activeClass._id,
        task: {
          title: this.form.value.title,
          description: this.form.value.description
        }
      }).subscribe({
          next: async (dto: { _id: string; tasks: Task[] }) => {
            this.classService.activeClass.tasks = dto.tasks;
            await this.popoverController.dismiss();
            this.toastService.showToast('Tarefa criada', 'success');
          }
        }
      );
    }
  }

}
