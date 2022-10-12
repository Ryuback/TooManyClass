import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../../shared/model/task/task.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../../services/user/user.service';
import { CreateGroupPage } from './create-group/create-group.page';
import { createGroup, Group } from '../../../../../shared/model/task/task-group';
import { Storage } from '@ionic/storage-angular';
import { Collaboration } from '../../../../../shared/model/collaboration.model';
import { createEntity } from '../../../../../shared/model/entity.model';
import { ConfirmationService } from '../../../../../services/confirmation/confirmation.service';
import { api } from '../../../../../../environments/environment';
import { SuggestionListPage } from './suggestion-list/suggestion-list.page';

interface ViewItem {
  _id: string;
  group: Collaboration[];
}

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.page.html',
  styleUrls: ['./task-group.page.scss']
})
export class TaskGroupPage implements OnInit {

  @Input() task: Task;
  loading: boolean = true;
  isStudent: boolean;
  groups: Group[] = [];
  items: ViewItem[] = [];
  students: Collaboration[];

  constructor(public modalController: ModalController,
              private cdr: ChangeDetectorRef,
              private userService: UserService,
              private storage: Storage,
              private actionSheetController: ActionSheetController,
              private confirmationService: ConfirmationService,
              private http: HttpClient) { }

  async ngOnInit() {
    this.isStudent = await this.userService.isStudent();
    const turma = await this.storage.get('activeClass');
    this.students = turma.collaborations;

    this.http.get(`${api}/task/${this.task._id}`).subscribe((res: any[]) => {
      this.groups = res.filter(g => g.accepted);
      this.load();
    });

  }

  async load() {
    this.items = [];
    const turma = await this.storage.get('activeClass');
    const students = turma.collaborations;
    this.students = turma.collaborations;

    this.groups.forEach(g => {
      const collabs: Collaboration[] = g.usersId.map(id => students.find(s => s.userId === id));
      const item: ViewItem = {
        ...createEntity(),
        group: collabs
      };
      this.items.push(item);
    });

    this.loading = false;
  }

  async openCreateGroupModal(suggestion: boolean = false) {
    const modal = await this.modalController.create({
      componentProps: {
        groups: this.items,
        isSuggestion: suggestion
      },
      component: CreateGroupPage,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    await modal.onWillDismiss().then((res) => {
      const group: string[] = res.data.group;
      if (group.length) {
        const newGroup = {
          ...createGroup(group),
          accepted: !suggestion
        };
        if (newGroup.accepted) {
          this.groups.push(newGroup);
        }
        this.http.post(`${api}/task/${this.task._id}/createGroup`, newGroup).subscribe();
        this.load();
      }
    });
    return;
  }

  removeGroup(group: ViewItem) {
    this.items = this.items.filter(g => g._id !== group._id);
  }

  close() {
    return this.modalController.dismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Gerar grupos aleatoriamente',
        icon: 'shuffle-outline',
        handler: () => {
          // this.addNewClassModal();
          this.openRandomDialog();
          return this.actionSheetController.dismiss();
        }
      }, {
        text: 'Aderir sugestão de grupo',
        icon: 'people-outline',
        handler: async () => {
          this.openSuggestionList();
          return this.actionSheetController.dismiss();
        }
      }, {
        text: 'Criar novo grupo',
        icon: 'add',
        handler: async () => {
          this.openCreateGroupModal();
          return this.actionSheetController.dismiss();
        }
      }]
    });
    await actionSheet.present();
  }

  async openRandomDialog() {
    await this.confirmationService.showAlert(
      'Gerar grupos aleatoriamente',
      'Os grupos gerados aleatóriamente apagam todos os grupos já existentes para serem gerados!',
      () => {
        console.warn('CONFIRMEI');
        this.createRandomGroups();
      },
      () => {
        console.warn('CANCELEI');
      }
    );
  }

  async openSuggestionList() {
    const modal = await this.modalController.create({
      component: SuggestionListPage,
      cssClass: 'my-custom-class',
      componentProps: {
        task: this.task
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((res) => {
      console.log('DISMISS');
    });
    return;
  }

  async createRandomGroups() {
    let studentsId = [];
    this.groups = [];
    this.http.post(`${api}/task/${this.task._id}/createGroup/deleteAll`, {}).subscribe();
    this.students.forEach((s, index, array) => {
      if (index === array.length - 1) {
        studentsId.push(s.userId);
        this.groups.push(({
          ...createGroup(studentsId),
          accepted: true
        }));
        return;
      } else {
        if (studentsId.length === 5) {
          this.groups.push(({
            ...createGroup(studentsId),
            accepted: true
          }));
          studentsId = [];
          studentsId.push(s.userId);
        } else {
          studentsId.push(s.userId);
        }
      }
    });
    await this.http.post(`${api}/task/${this.task._id}/manyGroups`, this.groups.map(g => {
      delete g.accepted;
      return g;
    })).toPromise();
    this.load();
  }
}
