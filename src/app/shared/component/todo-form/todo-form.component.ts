import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoserviceService } from '../../service/todoservice.service';
import { UuidService } from '../../service/uuid.service';
import { Itodo } from '../../model/todo';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
   @ViewChild('todoForm') todoForm!:NgForm


   receivedtodoObj!:Itodo
   userId!:string
   IsinEditMode:boolean=false
  constructor(
    private _todoService:TodoserviceService,
    private _uuidService:UuidService,
    private _snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {

    this._todoService.todoItemObserval$.subscribe(response=>{
      if(response){
        this.IsinEditMode=true
        this.receivedtodoObj=response;
        this.userId=response.todoId
        this.todoForm.form.patchValue(response)
      }
    })

  }

  onSubmit(){
   if(this.todoForm.valid){
    let newObj={
      todoItem:this.todoForm.controls['todoItem'].value,
      todoId:this._uuidService.generateUuid()
    }
    this._todoService.createObj(newObj)
    this._snackbarService.addSnackbar(`${newObj.todoItem} is added successfully...!!!`)
    this.todoForm.reset()
   }
  }
  onUpdate(){
    let updatedObj={
      todoItem:this.todoForm.controls['todoItem'].value,
      todoId:this.userId
    }
    this.IsinEditMode=false
    this._todoService.onUpdate(updatedObj)

    this.todoForm.reset()
    this._snackbarService.addSnackbar(`${this.receivedtodoObj.todoItem} is updated to ${updatedObj.todoItem}`)
  }
}
