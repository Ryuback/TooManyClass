import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss']
})
export class ClassPage implements OnInit {

  isStudent: boolean = true;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private storage: Storage,
              private router: Router
  ) {}

  async ngOnInit() {
    this.isStudent = await this.userService.isStudent();
    await this.router.navigate(['students-list'], { relativeTo: this.route });
  }
}
