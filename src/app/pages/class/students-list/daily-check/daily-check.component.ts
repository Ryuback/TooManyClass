import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Quality } from '../../../../shared/model/collaboration.model';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../../environments/environment';
import { ClassService } from '../../../../services/class/class.service';

interface CheckList {
  userId: string;
  givenName: string;
  fullName: string;
  qualities: Quality[];
  isChecked: boolean;
}

@Component({
  selector: 'app-daily-check',
  templateUrl: './daily-check.component.html',
  styleUrls: ['./daily-check.component.css']
})
export class DailyCheckComponent implements OnInit {

  @Input() students: CheckList[];

  constructor(public modalController: ModalController,
              public classService: ClassService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.students = this.students.sort((a, b) => {
      if (a.givenName.toLocaleLowerCase() < b.givenName.toLocaleLowerCase()) { return -1; }
      if (a.givenName.toLocaleLowerCase() > b.givenName.toLocaleLowerCase()) { return 1; }
      return 0;
    });
    this.students.forEach(v => v.isChecked = true);
  }

  close() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async sentCall() {
    const newObject = [];
    this.students.forEach(v => {
      if (!v.isChecked) {
        newObject.push({
          userId: v.userId,
          isChecked: v.isChecked
        });
      }
    });
    console.log(newObject);
    // eslint-disable-next-line no-underscore-dangle
    this.http.post(`${api}/class/dailyCall?classId=${this.classService.activeClass._id}`, newObject).subscribe();
    const allClasses = await this.classService.getAllClasses();
    // eslint-disable-next-line no-underscore-dangle
    await this.classService.setClass(allClasses.filter(c => c._id === this.classService.activeClass._id)[0]);
    console.log(this.classService.activeClass);
    this.close();
  }
}
