import { Injectable } from '@angular/core';
import { Itodo } from '../model/todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  todoArr:Array<Itodo>=[
    {
      todoItem:'python',
      todoId:'1'
    },
    {
      todoItem:'java',
      todoId:'2'
    }
  ]

  private todoItem=new BehaviorSubject<any>(null);
  todoItemObserval$=this.todoItem.asObservable();
  constructor() { }

  fetchAlltodo(){
    return this.todoArr;
  }

  createObj(todo:Itodo){
    this.todoArr.push(todo)
  }

  removeTodo(todo:Itodo){
    let getIndex=this.todoArr.findIndex(f=>f.todoId===todo.todoId)
    this.todoArr.splice(getIndex,1)
  }

  editObj(todo:any){
    this.todoItem.next(todo)
  }

  onUpdate(todo:Itodo){
    let getIndex=this.todoArr.findIndex(f=>f.todoId===todo.todoId);
    this.todoArr[getIndex]=todo
  }
}
