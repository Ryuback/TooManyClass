import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Class } from '../../../shared/model/class.model';
import { createEntity } from '../../../shared/model/entity.model';
import { ClassService } from '../../../services/class/class.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss']
})
export class CreateClassPage implements OnInit {

  private form: FormGroup;

  constructor(private modalController: ModalController,
              private classService: ClassService,
              private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null],
      description: [null]
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async submit() {
    const newClass: Class = {
      ...createEntity(),
      ...this.form.value,
      tasks: []
    };
    console.log(newClass);
    await this.classService.createClass(newClass);
    this.dismiss();
  }
}
