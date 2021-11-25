import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskPage } from './task/task.page';

interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-class-tasks',
  templateUrl: './class-tasks.page.html',
  styleUrls: ['./class-tasks.page.scss']
})
export class ClassTasksPage implements OnInit {

  tasks: Task[] = [
    {
      title: 'Teste1',
      description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.'
    },
    {
      title: 'Teste2',
      description: 'Descrição 2'
    },
    {
      title: 'Teste3',
      description: 'Descrição 3'
    },
    {
      title: 'Teste4',
      description: 'Descrição 4'
    }
  ];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async openTask(task: Task) {
    console.log(task);
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: {
        task
      }
    });
    return await modal.present();
  }
}
