import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Collaboration } from '../../../shared/model/collaboration.model';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../environments/environment';
import { ClassService } from '../../../services/class/class.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  @Input() student: Collaboration;

  constructor(public modalController: ModalController,
              private classService: ClassService,
              private cdr: ChangeDetectorRef,
              private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.student);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  addQuality(quality: string) {
    console.log(quality);
    const DTO = {
      // eslint-disable-next-line no-underscore-dangle
      studentId: this.student.userId,
      quality
    };
    // eslint-disable-next-line no-underscore-dangle
    this.http.post(`${api}/class/addQuality?classId=${this.classService.activeClass._id}`, DTO).subscribe({
      next: () => {
        const q = this.student.qualities.filter(v => v.name === quality);
        q[0].count++;
        this.cdr.detectChanges();
      }
    });
  }
}
