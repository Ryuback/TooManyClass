import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Collaboration } from '../../../shared/model/collaboration.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() student: Collaboration;

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
    console.log(this.student);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
