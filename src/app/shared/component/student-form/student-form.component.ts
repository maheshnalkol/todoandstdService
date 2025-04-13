import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../service/student.service';
import { UuidService } from '../../service/uuid.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Istudent } from '../../model/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('stdForm') stdForm!:NgForm

  studentId!:string;
  isIneditMode:boolean=false
  studentObj!:Istudent


  constructor(
    private _stdService:StudentService,
    private _uuidService:UuidService,
    private _snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this._stdService.studentobj$.subscribe(res=>{
      if(res){
        this.studentId=res.stdId;
        this.isIneditMode=true;
        this.studentObj=res;
        this.stdForm.form.patchValue(res)
      }
    })
  }

  onSubmit(){
   if(this.stdForm.valid){
    let newObj={
      ...this.stdForm.value,
      stdId:this._uuidService.generateUuid()
    }
  this._stdService.createStdObj(newObj)
    this._snackbarService.addSnackbar(`${newObj.fname} ${newObj.lname} is added successfully...!!!`)
    this.stdForm.reset()
   }
  }

  onUpdate(){
    let UpdatedObj={
      ...this.stdForm.value,
    stdId:this.studentId
    }
    this.isIneditMode=false
    this._snackbarService.addSnackbar(`${this.studentObj.fname} ${this.studentObj.lname}  is updated to ${UpdatedObj.fname} ${UpdatedObj.lname}`)
    this._stdService.onupdate(UpdatedObj)
    this.stdForm.reset()
  }
}
