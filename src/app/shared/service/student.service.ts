import { Injectable } from '@angular/core';
import { Istudent } from '../model/student';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentArr:Array<Istudent>=[
    {
      fname:'john',
      lname:'doe',
      email:'johndoe@gmail.com',
      contact:12132444,
      stdId:'1'
    }
  ]

  private studentObj=new BehaviorSubject<any>(null);
  studentobj$=this.studentObj.asObservable();

  constructor() { }

  fetchAllStdData(){
    return this.studentArr
  }

  createStdObj(std:Istudent){
    this.studentArr.push(std)
  }


  removestd(std:Istudent){
    let getIndex=this.studentArr.findIndex(f=>f.stdId===std.stdId)
    this.studentArr.splice(getIndex,1)
  }

  onEdit(std:Istudent){
    this.studentObj.next(std)
  }

  onupdate(std:Istudent){
    let getIndex=this.studentArr.findIndex(f=>f.stdId===std.stdId)
    this.studentArr[getIndex]=std
  }
}
