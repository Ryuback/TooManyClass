import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { api } from '../../../../../../../environments/environment';
import { Group } from '../../../../../../shared/model/task/task-group';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../../../../shared/model/task/task.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Collaboration } from '../../../../../../shared/model/collaboration.model';
import { UserService } from '../../../../../../services/user/user.service';
import { Storage } from '@ionic/storage-angular';
import { ConfirmationService } from '../../../../../../services/confirmation/confirmation.service';
import { ToastService } from '../../../../../../services/toast/toast.service';

interface ViewItem {
  _id: string;
  group: Collaboration[];
}

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.page.html',
  styleUrls: ['./suggestion-list.page.scss']
})
export class SuggestionListPage implements OnInit {

  @Input() task: Task;
  suggestions: Group[] = [];
  loading: boolean = true;
  items: ViewItem[] = [];
  students: Collaboration[];

  constructor(public modalController: ModalController,
              private cdr: ChangeDetectorRef,
              private userService: UserService,
              private storage: Storage,
              private actionSheetController: ActionSheetController,
              private confirmationService: ConfirmationService,
              private toastService: ToastService,
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${api}/task/${this.task._id}`).subscribe((res: any[]) => {
      this.suggestions = res.filter(g => !g.accepted);
      this.load();
    });
  }

  async load() {
    this.items = [];
    const turma = await this.storage.get('activeClass');
    const students = turma.collaborations;
    this.students = turma.collaborations;

    this.suggestions.forEach(g => {
      const collabs: Collaboration[] = g.usersId.map(id => students.find(s => s.userId === id));
      const item: ViewItem = {
        _id: g._id,
        group: collabs
      };
      this.items.push(item);
    });
    this.loading = false;
  }

  close() {
    return this.modalController.dismiss();
  }

  acceptGroup(item: ViewItem) {
    console.log('ACCEPT', item);
    this.http.get(`${api}/task/${this.task._id}/acceptGroup/${item._id}`).subscribe();
    this.toastService.showToast('Grupo adicionado', 'success');
    this.removeGroup(item, false);

  }

  removeGroup(item: ViewItem, removeOnBackEnd: boolean) {
    console.log('REMOVE', item);
    if (removeOnBackEnd) {
      this.http.delete(`${api}/task/${this.task._id}/rejectGroup/${item._id}`).subscribe();
      this.toastService.showToast('Grupo removido', 'warning');
    }
    this.items = this.items.filter(g => g._id !== item._id);
  }
}
