import { Injectable } from "@angular/core";


//allows injecting into service
@Injectable()
//when injected need to add to app.module
export class TaToolbarService{
	bOpen = false;
	iOpen = false;
	undlOpen = false;
	pOpen = false;
	liOpen = false;
	ulOpen = false;



	public addTag(tag: string){
		this.tagToggle(tag);
		var output;
		var open = this.getTagStatus(tag);
		if(open){
			output = "<" + tag + ">";
		}
		else{
			output = "</" + tag + ">";
		}
		console.log("service: " + output);
		console.log("tag: " + tag);
		console.log("open: " + open);


		return output;

	}
	tagToggle(tag : string){
		switch (tag) {
			case 'p':
				this.pToggle();
				// code...
				break;
			
			default:
				// code...
				break;
		}
	}
	getTagStatus(tag : string){
		switch (tag) {
			case 'p':
				return this.p();
			default:
				// code...
				break;
		}
	}

	bToggle(){
		this.bOpen = !this.bOpen;
	}

	iToggle(){
		this.iOpen = !this.iOpen;
	}
	
	pToggle(){
		this.pOpen = !this.pOpen;
	}

	b(){
		return this.bOpen;
	}

	i(){
		return this.iOpen;
	}
	p(){
		return this.pOpen;
	}

	
}