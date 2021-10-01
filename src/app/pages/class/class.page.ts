import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Student {
  name: string;
}

@Component({
  selector: 'app-class',
  templateUrl: './class.page.html',
  styleUrls: ['./class.page.scss']
})
export class ClassPage implements OnInit {

  students: Student[] = [];

  constructor() { }

  ngOnInit() {
    this.students = [{ name: 'João' }, { name: 'Maria' },
      { name: 'Pedro' }, { name: 'João' }, { name: 'Maria' },
      { name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' }];
  }

}
