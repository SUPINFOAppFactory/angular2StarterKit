import {Component} from 'angular2/core';
import {Todos} from './todo/todo.component';

@Component({
    selector: 'my-app',
    templateUrl: './src/app.html',
    directives: [Todos]
})

export class AppComponent  {

    constructor() {

    }

}