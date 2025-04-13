import { Component, OnInit } from '@angular/core';
import { Itodo } from '../../model/todo';
import { TodoserviceService } from '../../service/todoservice.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoData!:Array<Itodo>
  constructor(
    private _todoService:TodoserviceService,
    private _snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.todoData=this._todoService.fetchAlltodo()
  }


  onRemove(todo:Itodo){
    let getConfirm=confirm(`Are you sure! you want to delete ${todo.todoItem}?`)
    if(getConfirm){
      this._todoService.removeTodo(todo)
      this._snackbarService.addSnackbar(`${todo.todoItem} is deleted successfully...!!!`)

    }
  }

  onEdit(todo:Itodo){
  this._todoService.editObj(todo)
  }

}
