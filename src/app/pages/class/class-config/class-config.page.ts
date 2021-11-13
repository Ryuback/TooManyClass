import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Class } from '../../../shared/model/class.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-class-config',
  templateUrl: './class-config.page.html',
  styleUrls: ['./class-config.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassConfigPage implements OnInit {

  class: Class;
  showCode: boolean;

  constructor(private storage: Storage,
              private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.class = await this.storage.get('activeClass');
    this.cdr.detectChanges();
  }

}
