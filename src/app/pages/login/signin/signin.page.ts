import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private firebaseService: FirebaseService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [null, Validators.required],
      givenName: [null, Validators.required],
      email: [null, Validators.required],
      passwd: [null, Validators.required]
    });
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.firebaseService
      .register(
        this.form.value.email,
        this.form.value.passwd,
        this.form.value.fullName,
        this.form.value.givenName)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('dashboard');
      })
      .catch(async e => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: e,
          position: 'top',
          duration: 2000
        });
        await toast.present();
      });
    console.log(this.form.value);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
