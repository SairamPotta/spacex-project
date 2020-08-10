import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() emitFilter = new EventEmitter();
  years = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];
  booleanOptions = [true, false]
  activeYear: string;
  isLanded: boolean = undefined;
  isLaunched: boolean = undefined;
  constructor() { }

  ngOnInit(): void {
  }
 
  isSelected(item: string | boolean, option?: string) {
    const obj = {};
    if (option === 'launched') {
      this.isLaunched = <boolean>item;
    } else if (option === 'landed') {
      this.isLanded = <boolean>item;
    } else {
      this.activeYear = <string>item;
    }
    if (this.isLaunched !== undefined) {
      obj['launch_success'] = this.isLaunched;
    }
    if (this.isLanded !== undefined) {
      obj['land_success'] = this.isLanded;
    }
    if (this.activeYear) {
      obj['launch_year'] = this.activeYear;
    }    
    this.emitFilter.emit(obj);
  }

  removeFilter() {
    this.activeYear = undefined;
    this.isLaunched = undefined;
    this.isLanded = undefined;
    this.emitFilter.emit();
  }

}
