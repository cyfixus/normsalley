import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform{
    transform(items: any[], criteria: string): any {
    	criteria = criteria.toLowerCase();
    	this.truncate(criteria);
    	if(criteria == 'all') {return items } else
    	return items.filter(item => {
    		return (item.tag == criteria) || 
    		(item.content.toLowerCase().indexOf(criteria) !== -1) ||
    		(item.title.toLowerCase().indexOf(criteria) !== -1) ||
    		(item.username.toLowerCase().indexOf(criteria) !== -1);
    	});
    }
    //doesnt work.... 
    truncate(criteria: string){
    	console.log("truncate attempt: " + criteria);
	    	if(criteria.indexOf('/\s/g', criteria.length+1)){
	    		console.log("trunc res: " + criteria.slice(0, criteria.length-1));
    		
    		}
    }
}