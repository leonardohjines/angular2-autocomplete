import {Component, ElementRef} from 'angular2/core';

@Component({
    selector: 'my-app',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="country" type="text" class="validate filter-input" [(ngModel)]=query (keyup)=filter($event)  (blur)=handleBlur()>
              <label for="country">Country</label>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="#item of filteredList;#idx = index" >
                    <li [class.complete-selected]="idx == selectedIdx">
                        <a (click)="select(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
    	`
})

export class AppComponent {
    public query = '';
    public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia & Herzegovina",
        "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein",
        "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
        "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia",
        "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
    public filteredList = [];
    public elementRef;
    selectedIdx: number;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
        this.selectedIdx = -1;
    }

    filter(event: any) {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx++;
            } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            }
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleBlur() {
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
        this.selectedIdx = -1;
    }


}