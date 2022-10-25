import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/model/user.model';
import { ToastService } from '../../../services/toast/toast.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private toastService: ToastService,
              private firebaseService: FirebaseService) {

  }

  async ngOnInit() {
    this.user = await this.userService.getCurrentUserDB();
  }

  submit() {
    this.firebaseService.updatePasswd();
    this.toastService.showToast('Email de redefinição enviado', 'success');
  }
}
