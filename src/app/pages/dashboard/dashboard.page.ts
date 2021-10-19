import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/model/user.model';
import { ModalController } from '@ionic/angular';
import { CreateClassPage } from './create-class/create-class.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  user: User;
  bubble = true;

  constructor(private userService: UserService,
              public modalController: ModalController) {
    console.log('#DashboardPage.constructor');
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.user = await this.userService.getCurrentUser();
    console.log(this.user);
    console.log(this.user.imageUrl);
  }

  async addNewClassModal() {
    const modal = await this.modalController.create({
      component: CreateClassPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async logOut() {
    return this.userService.logOut();
  }

}
