import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TaskPage } from './task/task.page';
import { UserService } from '../../../services/user/user.service';
import { NewTaskPage } from './new-task/new-task.page';
import { ClassService } from '../../../services/class/class.service';

interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-class-tasks',
  templateUrl: './class-tasks.page.html',
  styleUrls: ['./class-tasks.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassTasksPage {

  tasks: Task[];
  isStudent = true;

  constructor(public modalController: ModalController,
              private popoverController: PopoverController,
              private classService: ClassService,
              private cdr: ChangeDetectorRef,
              private userService: UserService) { }

  async ionViewWillEnter() {
    this.tasks = this.classService.activeClass.tasks;
    this.isStudent = await this.userService.isStudent();
    this.cdr.detectChanges();
  }

  async openTask(task: Task) {
    console.log(task);
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: {
        task
      }
    });
    await modal.present();
    await modal.onDidDismiss();

    this.tasks = this.classService.activeClass.tasks;
    this.cdr.detectChanges();
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: NewTaskPage,
      cssClass: 'popover_setting',
      translucent: true
    });
    await popover.present();

    await popover.onDidDismiss();

    this.tasks = this.classService.activeClass.tasks;
    this.cdr.detectChanges();
  }
}
