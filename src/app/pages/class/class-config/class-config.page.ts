import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Class } from '../../../shared/model/class.model';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../services/class/class.service';
import { isEqualObject } from '../../../../utils/object-utils';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../environments/environment';
import { finalize, tap } from 'rxjs/operators';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-config',
  templateUrl: './class-config.page.html',
  styleUrls: ['./class-config.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassConfigPage implements OnInit {

  class: Class;
  showCode: boolean;
  showUpdateForm = false;
  form: FormGroup;

  loading = false;

  constructor(private storage: Storage,
              private classService: ClassService,
              private fb: FormBuilder,
              private toastService: ToastService,
              private confirmationService: ConfirmationService,
              private loadingCtrl: LoadingController,
              private http: HttpClient,
              private router: Router,
              private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.class = await this.storage.get('activeClass');

    this.form = this.fb.group({
      title: [this.class.name, Validators.required],
      description: [this.class.description]
    });

    this.cdr.detectChanges();
  }

  async onSaveClass() {
    if (this.form.valid) {
      const classConfig = {
        title: this.class.name,
        description: this.class.description
      };
      if (isEqualObject(classConfig, this.form.value)) {
        this.toastService.showToast('Turma atualizada com sucesso.', 'success');
        this.showForm(false);
        this.cdr.markForCheck();
      } else {
        const newClass: Class = {
          ...this.class,
          name: this.form.value.title,
          description: this.form.value.description
        };
        this.loading = true;
        this.http.patch(`${api}/class/${this.class._id}`, newClass).pipe(
          finalize(() => {
            this.loading = false;
          }),
          tap(() => {
            this.toastService.showToast('Turma atualizada com sucesso.', 'success');
            this.class = newClass;
            this.showForm(false);
            this.cdr.markForCheck();
          })
        ).subscribe();

      }
    } else {
      console.warn('#FOMULARIO INVALIDO');
    }
  }

  showLink(value: boolean) {
    this.showUpdateForm = false;
    this.showCode = value;
  }

  showForm(value: boolean) {
    this.showCode = false;
    this.showUpdateForm = value;
  }

  async openExcludeDialog() {
    const loading = await this.loadingCtrl.create({
      message: 'Removendo turma...'
    });
    await this.confirmationService.showAlert(
      'Deseja realmente exluir essa classe?',
      'Esteja ciente que todos os dados serão apagados sem possibilidade de recuperação!',
      () => {
        console.warn('CONFIRMEI');
        loading.present();
        this.http.delete(`${api}/class/${this.class._id}`).pipe(
          finalize(() => {
            loading.dismiss();
          }),
          tap(async () => {
            await this.router.navigateByUrl('dashboard');
            this.toastService.showToast('Turma removida com sucesso.', 'success');
          })
        ).subscribe();
      },
      () => {
        console.warn('CANCELEI');
      }
    );
  }

}
