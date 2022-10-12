import { Component, Input, OnInit } from '@angular/core';
import { Class } from '../../../../../../shared/model/class.model';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { Collaboration } from '../../../../../../shared/model/collaboration.model';
import { ToastService } from '../../../../../../services/toast/toast.service';

interface ViewItem {
  userId: string;
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss']
})
export class CreateGroupPage implements OnInit {

  @Input() groups: { group: Collaboration[] }[];
  class: Class;
  students: ViewItem[] = [];
  @Input() isSuggestion: boolean;

  constructor(private storage: Storage,
              private modalController: ModalController,
              private toastService: ToastService) {

  }

  async ngOnInit() {
    console.log(this.groups);
    console.log(this.isSuggestion);
    this.class = await this.storage.get('activeClass');
    this.students = this.class.collaborations.map(u => ({
      userId: u.userId,
      name: u.givenName ?? u.fullName,
      isChecked: false
    }));

    this.groups.forEach(i => {
      const groupStudentsId = i.group.map(a => a.userId);
      this.students = this.students.filter(a => !groupStudentsId.includes(a.userId));
    });
  }

  async ionViewDidEnter() {
    if (this.students.length === 0) {
      await this.modalController.dismiss();
      return this.toastService.showToast('Todos os alunos já estão em algum grupo.', 'warning');
    }
  }

  close(backButton: boolean) {
    if (backButton) {
      return this.modalController.dismiss();
    }
    this.modalController.dismiss({
      group: this.students.filter(s => s.isChecked).map(s => s.userId)
    });
  }

}
