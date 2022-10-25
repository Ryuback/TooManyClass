import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  res: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private firebaseService: FirebaseService,
              private toastController: ToastController,
              public router: Router) {
    console.log('#SignupPage.constructor');
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.email],
      passwd: [null, Validators.required]
    });
  }

  async loginGoogle() {
    this.firebaseService.loginWithGoogle()
      .then(res => {
        console.log('#SignupPage.firebaseService.loginGoogle', 'SUCCESS');
        this.router.navigateByUrl('dashboard');
      })
      .catch();
  }

  async submit() {
    if (this.form.valid) {
      this.firebaseService.login(this.form.value.email, this.form.value.passwd).then(() => {
        this.router.navigateByUrl('dashboard');
      }).catch(async () => {
        const toast = await this.toastController.create({
          message: 'Algum campo está incorreto.',
          position: 'top',
          duration: 2000
        });
        toast.present();
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Nenhum campo deve estar vazio ou incorreto.',
        position: 'top',
        duration: 2000
      });
      toast.present();
    }
  }
}
