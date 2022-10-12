import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfilePage {

  user: User;

  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef) { }

  ionViewWillEnter() {
    this.load().then();
  }

  async load() {
    this.user = await this.userService.getCurrentUserDB();
    console.log(this.user);
    this.cdr.markForCheck();
  }

}
