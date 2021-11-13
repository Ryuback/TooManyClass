import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/model/user.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
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
              public modalController: ModalController,
              public actionSheetController: ActionSheetController) {
    console.log('#DashboardPage.constructor');
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.user = await this.userService.getCurrentUser();
    this.classService.getAllClasses().then(v => {
      this.classes = v;
      console.log('Classes => ', this.classes);
    });
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Criar uma nova turma',
        icon: 'add-circle-outline',
        handler: () => {
          this.addNewClassModal();
        }
      }, {
        text: 'Entrar em uma turma existente',
        icon: 'link',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
