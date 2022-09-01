import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../shared/model/user.model';
import { ActionSheetController, AnimationController, ModalController, PopoverController } from '@ionic/angular';
import { CreateClassPage } from './create-class/create-class.page';
import { ClassService } from '../../services/class/class.service';
import { Class } from '../../shared/model/class.model';
import { Router } from '@angular/router';
import { PopoverPage } from './popover/popover.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {

  @ViewChild('speechbubble') speechBubble;
  loading = true;

  user: User;
  bubble = true;

  classes: Class[];

  constructor(private userService: UserService,
              private router: Router,
              private classService: ClassService,
              private cdr: ChangeDetectorRef,
              public modalController: ModalController,
              public actionSheetController: ActionSheetController,
              private animationCtrl: AnimationController,
              public popoverController: PopoverController) {
    console.log('#DashboardPage.constructor');
  }

  ionViewWillEnter() {
    this.load().then(() => this.loading = false);
  }

  async load() {
    this.user = await this.userService.getCurrentUserDB();
    this.classes = await this.classService.getAllClasses();
    this.cdr.markForCheck();
  }

  async addNewClassModal() {
    const modal = await this.modalController.create({
      component: CreateClassPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    await modal.onWillDismiss();
    await this.load();
    return;
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
        handler: async () => {
          this.presentPopover();
          return this.actionSheetController.dismiss();
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      translucent: true
    });
    await popover.present();

    await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role');
  }

  me() {
    this.userService.getCurrentUser().then(
      v => console.log(v)
    );
  }

  async openUserProfile() {
    await this.router.navigateByUrl('user-profile');
  }

  async closeBubble() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.speechbubble'))
      .duration(300)
      .fromTo('transform', 'translateY(0px)', 'translateY(-100px)')
      .fromTo('opacity', '1', '0')
      .onFinish(() => {
        animation.stop();
        this.bubble = false;
        this.cdr.markForCheck();
      });
    await animation.play();
  }
}
