import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../../environments/environment';
import { ClassService } from '../../../../services/class/class.service';
import { PopoverController } from '@ionic/angular';
import { Task } from 'src/app/shared/model/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskPage implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private classService: ClassService,
              private cdr: ChangeDetectorRef,
              private popoverController: PopoverController,
              private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null],
      description: [null]
    });
  }

  submit() {
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
        }
      }
    );
  }

}
