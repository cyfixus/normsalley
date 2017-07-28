import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse'
})
export class ReversePipe {
    transform(value) {
    	if(!value) return;
        return value.reverse();
    }
}