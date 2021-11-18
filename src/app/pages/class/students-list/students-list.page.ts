import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Class } from '../../../shared/model/class.model';
import { AnimationController, ModalController } from '@ionic/angular';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Storage } from '@ionic/storage-angular';
import { Collaboration } from '../../../shared/model/collaboration.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.scss']
})
export class StudentsListPage implements OnInit {

  class: Class;
  students: Collaboration[] = [];

  constructor(private animationCtrl: AnimationController,
              public modalController: ModalController,
              private storage: Storage,
              private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.class = await this.storage.get('activeClass');
    console.log(this.class);
    this.students = this.class.collaborations;
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

}
