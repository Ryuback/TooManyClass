import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router
  ) {}

  async ngOnInit() {
    await this.router.navigate(['students-list'], { relativeTo: this.route });
  }
}
