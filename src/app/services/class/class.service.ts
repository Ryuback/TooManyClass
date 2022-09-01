import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../environments/environment';
import { Class } from '../../shared/model/class.model';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  activeClass?: Class;

  constructor(private storage: Storage,
              private http: HttpClient) {
    console.log('#ClassService.constructor');
  }

  async createClass(newClass: Class): Promise<any> {
    return this.http.post(`${api}/class`, newClass).toPromise();
  }

  async getAllClasses(): Promise<Class[]> {
    return this.http.get<Class[]>(`${api}/class`).toPromise();
  }

  setClass(activeClass: Class) {
    this.activeClass = activeClass;
    return this.storage.set('activeClass', activeClass);
  }

  updateClass(updatedClass: Partial<Class>): Observable<void> {
    const newClass: Class = {
      ...this.activeClass,
      updatedClass
    } as Class;

    return this.http.patch<void>(`${api}/class/${newClass._id}`, newClass);
  }

}
