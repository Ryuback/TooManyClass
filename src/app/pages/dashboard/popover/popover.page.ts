import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../../environments/environment';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss']
})
export class PopoverPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      classCode: [null, Validators.required]
    });

  }

  submit() {
    console.log(this.form.value.classCode);
    this.http.post<void>(`${api}/class/enterWithLink?id=${this.form.value.classCode}`, {}).subscribe();
  }
}
