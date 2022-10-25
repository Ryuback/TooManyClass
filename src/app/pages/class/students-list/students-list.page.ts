import { ChangeDetectorRef, Component } from '@angular/core';
import { Class } from '../../../shared/model/class.model';
import { ActionSheetController, AnimationController, ModalController } from '@ionic/angular';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Storage } from '@ionic/storage-angular';
import { Collaboration } from '../../../shared/model/collaboration.model';
import { UserService } from '../../../services/user/user.service';
import { DailyCheckComponent } from './daily-check/daily-check.component';
import { ClassService } from '../../../services/class/class.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.scss']
})
export class StudentsListPage {

  class: Class;
  students: Collaboration[] = [];
  isStudent: boolean;

  constructor(private animationCtrl: AnimationController,
              public modalController: ModalController,
              private classService: ClassService,
              private userService: UserService,
              private storage: Storage,
              private cdr: ChangeDetectorRef,
              private actionSheetController: ActionSheetController) { }

  async ionViewWillEnter() {
    this.isStudent = await this.userService.isStudent();
    this.class = await this.storage.get('activeClass');
    console.log(this.class);
    this.students = this.class.collaborations.map(s => ({ ...s, absent: s.absent ? s.absent : 0 }));
    this.cdr.detectChanges();
  }

  async selectRandomly() {
    const student = this.students[Math.floor(Math.random() * this.students.length)];
    // const student = this.students.find(s => s.name === 'George');
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector(`.${student.givenName}`))
      .duration(100)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(2px)');
    animation.play();
    setTimeout(() => {
      animation.stop();
      this.userModal(student);
    }, 800);
  }

  async userModal(student: any) {
    const modal = await this.modalController.create({
      component: UserProfileComponent,
      componentProps: {
        student
      }
    });
    return await modal.present();
  }

  async checkModal() {
    const modal = await this.modalController.create({
      component: DailyCheckComponent,
      componentProps: {
        students: this.students.map(s => ({ ...s, name: s.fullName || s.givenName }))
      }
    });
    await modal.present();
    await this.ionViewWillEnter();
    await modal.onDidDismiss();
    this.class = this.classService.activeClass;
    await this.ionViewWillEnter();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Nome',
          handler: () => {
            this.students = this.students.sort((a, b) => {
              if (a.givenName.toLocaleLowerCase() < b.givenName.toLocaleLowerCase()) { return -1; }
              if (a.givenName.toLocaleLowerCase() > b.givenName.toLocaleLowerCase()) { return 1; }
              return 0;
            });
            this.cdr.detectChanges();
          }
        },
        {
          text: 'Qualidades',
          handler: () => {
            this.students = this.students.sort((a, b) => {
              let countA = 0;
              let countB = 0;
              a.qualities.forEach(v => countA = v.count + countA);
              b.qualities.forEach(v => countB = v.count + countB);
              console.log(a.givenName, countA);
              console.log(b.givenName, countB);
              if (countA > countB) { return -1; }
              if (countA < countB) { return 1; }
              return 0;
            });
            console.log(this.students);
            this.cdr.detectChanges();
          }
        }, {
          text: 'Faltas',
          handler: async () => {
            this.students = this.students.sort((a, b) => {
              if (a.absent > b.absent) { return -1; }
              if (a.absent < b.absent) { return 1; }
              return 0;
            });
            console.log(this.students);
            this.cdr.detectChanges();
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

}
