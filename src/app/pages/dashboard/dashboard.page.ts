import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/model/user.model';
import { ModalController } from '@ionic/angular';
import { CreateClassPage } from './create-class/create-class.page';
import { ClassService } from '../../services/class/class.service';
import { Class } from '../../shared/model/class.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  user: User;
  bubble = true;

  classes: Class[];

  constructor(private userService: UserService,
              private router: Router,
              private classService: ClassService,
              public modalController: ModalController) {
    console.log('#DashboardPage.constructor');
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.user = await this.userService.getCurrentUser();
    this.classes = await this.classService.getAllClasses();
    console.log('Classes => a ', this.classes);
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

  async doRefresh($event: any) {
    await this.load();
    $event.target.complete();
  }

  async setActiveClass(selectedClass: Class) {
    await this.classService.setClass(selectedClass);
    return this.router.navigateByUrl('class');
  }
}
