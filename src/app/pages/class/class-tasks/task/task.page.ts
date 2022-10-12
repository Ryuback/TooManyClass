import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { UserService } from '../../../../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../../environments/environment';
import { ClassService } from '../../../../services/class/class.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskGroupPage } from './task-group/task-group.page';
import { NewTaskPage } from '../new-task/new-task.page';

interface Comment {
  _id: string;
  userFullName: string;
  userGivenName: string;
  comment: string;
  userPhoto: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  comments: Comment[];
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  @Input() task: Task;
  isStudent: boolean = true;
  form: FormGroup;
  comments: Comment[];

  constructor(private fb: FormBuilder,
              public modalController: ModalController,
              private classService: ClassService,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private http: HttpClient,
              private popoverController: PopoverController,
              public alertController: AlertController) { }

  async ngOnInit() {
    this.form = this.fb.group({
      comment: [null]
    });
    this.isStudent = await this.userService.isStudent();
    console.log('#IS STUDENT:', this.isStudent);
    this.comments = this.task.comments;
    this.cdr.markForCheck();
  }

  close() {
    return this.modalController.dismiss();
  }

  async removeAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja escluir a tarefa ' + this.task.title + ' ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            // eslint-disable-next-line no-underscore-dangle
            this.http.delete(`${api}/task/${this.task._id}`).subscribe({
              next: () => {
                this.classService.activeClass.tasks = this.classService.activeClass.tasks.filter(v => v._id !== this.task._id);
                this.modalController.dismiss();
              }
            });
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    this.cdr.detectChanges();
  }

  submit() {
    const dtoComment = {
      comment: this.form.value.comment,
      // eslint-disable-next-line no-underscore-dangle
      classId: this.classService.activeClass._id,
      // eslint-disable-next-line no-underscore-dangle
      taskId: this.task._id
    };
    this.http.post(`${api}/task/comment`, dtoComment).subscribe({
      next: (v: any) => {
        this.classService.activeClass.tasks = v.tasks;
        // eslint-disable-next-line no-underscore-dangle
        this.task = v.tasks.find(task => task._id === this.task._id);
        this.comments = this.task.comments;
        this.form.reset();
        this.cdr.detectChanges();
      }
    });
  }

  async openGroupList() {
    const modal = await this.modalController.create({
      component: TaskGroupPage,
      componentProps: {
        task: this.task
      }
    });
    await modal.present();
    await modal.onDidDismiss();

    this.cdr.detectChanges();
  }

  async openEditDialog() {
    const popover = await this.popoverController.create({
      mode: 'ios',
      component: NewTaskPage,
      translucent: true,
      animated: true,
      componentProps: {
        task: this.task
      }
    });
    await popover.present();

    const data = await popover.onDidDismiss();
    this.task = data.data;
    console.log(this.task);

    this.cdr.detectChanges();
  }
}
