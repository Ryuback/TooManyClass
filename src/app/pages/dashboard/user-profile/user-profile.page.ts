import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

}
