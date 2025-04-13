import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { Istudent } from '../../model/student';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  stdData!:Array<Istudent>
  constructor(
    private _stdService:StudentService,
    private _snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.stdData=this._stdService.fetchAllStdData()
  }

  onEdit(std:Istudent){
    this._stdService.onEdit(std)
  }

  onRemove(std:Istudent){
    let getConfirm=confirm(`Are you sure! you want to remove this ${std.fname} ${std.lname}?`)
    if(getConfirm){

      this._stdService.removestd(std)
      this._snackbarService.addSnackbar(`${std.fname} ${std.lname} is removed successfully...!!!`)
    }

  }
}
