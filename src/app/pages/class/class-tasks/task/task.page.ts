import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  @Input() task: Task;

  constructor(public modalController: ModalController,
              public alertController: AlertController) { }

  ngOnInit() {
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
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
