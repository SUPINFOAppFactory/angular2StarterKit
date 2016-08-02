import {Component, View, OnInit, Input, ChangeDetectorRef} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {statusFilterPipe, todoStatus} from './filter.ts';

@Component({
    selector: 'todos',
    pipes: [statusFilterPipe],
    templateUrl: './src/todo/todo.html'
})

export class Todos  {
    title: string = "todos";
    todos: Todo[];
    toggleMode: boolean = true;
    filterStatus: todoStatus = todoStatus.all;
    allSelected: boolean = true;
    activeSelected: boolean = false;
    completeSelected: boolean = false;

    constructor(private ref: ChangeDetectorRef) {
        
        this.todos = [
            new Todo('Get Milk', false),
            new Todo('Brush Teeth', false)
        ];

        let that = this;

        //Get title via buildfire.js
        buildfire.datastore.onUpdate(function(obj){
            if(obj.data && obj.data.title){
                that.title = obj.data.title;
                //Manually trigger change detection
                that.ref.detectChanges();
            }
        });
    }
    
    clearCompleted(){
        this.todos = this.todos.filter(item => !item.isCompleted);
    }

    getActiveCount(){
        return this.todos.filter(item => !item.isCompleted).length;
    }

    showCompleted(){
        this.filterStatus = todoStatus.completed;
        this.allSelected = false;
        this.activeSelected = false;
        this.completeSelected = true;
    }

    showActive(){
        this.filterStatus = todoStatus.active;
        this.allSelected = false;
        this.activeSelected = true;
        this.completeSelected = false;
    }

    showAll(){
        this.filterStatus = todoStatus.all;
        this.allSelected = true;
        this.activeSelected = false;
        this.completeSelected = false;
    }

    addTodo(newTodo){
        this.todos.unshift(new Todo(newTodo, false));
    }

    isSelected(status: todoStatus){
        return (status === this.filterStatus);
    }

    toggleTodoStatus(name: string){
        this.findToDo(name)
            .toggleStatus();
    }
    deleteTodo(name: string){
        let todo = this.findToDo(name);
        let index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
    }

    findToDo(name: string){
        var todo = this.todos.find((todo) => {
            return todo.name === name;
        });

        return todo;
    }
    
    getCount(isCompleted: boolean){
        let todos = this.todos.find((todo) => {
            return todo.isCompleted === isCompleted;
        });

        let count = (todos && todos.length) ? todos.length : 0;

        return count;
    }

    toggleAll(){
        this.todos.map((todo) => {
            return todo.isCompleted = this.toggleMode;
        });

        this.toggleMode = !(this.toggleMode);
    }
}

export class Todo {
    name: string;
    isCompleted: boolean = false;

    constructor(name: string, isCompleted: boolean){
        this.name = name;
        this.isCompleted = isCompleted;
    }

    toggleStatus(){
        this.isCompleted = !(this.isCompleted);
    }
}