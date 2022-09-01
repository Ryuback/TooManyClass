import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private alertController: AlertController) {}

  async showAlert(header: string, message: string, onConfirm: () => void, onCancel?: () => void, onDismiss?: () => void) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => onCancel()
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => onConfirm()
        }
      ]
    });

    await alert.present();
  }
}
