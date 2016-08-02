import {Injectable, Pipe} from 'angular2/core';

@Pipe({
    name: 'status'
})
@Injectable()
export class statusFilterPipe implements PipeTransform {
    transform(items: any[], args: todoStatus[]): any {

        let filter: todoStatus = args[0];

        switch (filter){
            case todoStatus.all:
                return items;
                break;
            case todoStatus.active:
                return items.filter(item => item.isCompleted === false);
                break;
            case todoStatus.completed:
                return items.filter(item => item.isCompleted === true);
                break;
        }
    }
}

export enum todoStatus{
    all,
    active,
    completed
}
