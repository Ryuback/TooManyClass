import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { api } from '../../../../environments/environment';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss']
})
export class PopoverPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private loadingController: LoadingController,
              private popOverController: PopoverController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.form = this.fb.group({
      classCode: [null, Validators.required]
    });

  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.popOverController.dismiss();
    await loading.present();
    this.http.post<void>(`${api}/class/enterWithLink?id=${this.form.value.classCode}`, {}).subscribe({
      next: () => {
        loading.dismiss();
      },
      error: async (e) => {
        console.log(e);
        await loading.dismiss();
        if (e.status === 422) {
          const toast = await this.toastController.create({
            message: 'Você já participa dessa classe.',
            duration: 2000
          });
          await toast.present();
        }
      }
    });
  }
}
