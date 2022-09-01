import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Color } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showToast(header: string, color: Color, message?: string, position?: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      color: color,
      position: position ?? 'top',
      mode: 'ios',
      buttons: [
        {
          side: 'end',
          icon: 'close-outline'
        }
      ]
    } as ToastOptions);
    await toast.present();
  }
}
