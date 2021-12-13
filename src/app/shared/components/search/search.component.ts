/*import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm: Search = new Search();
  @Input() public placeholder!: string;
  @Input() public filterOptions: { filter: string; name: string }[] = [];
  @Output() searchByString = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.filterOptions.length > 0) {
      this.searchForm.filter = this.filterOptions[0].filter;
    }
  }

  public onFormSubmit(form: FormGroup): void {
    if (form.valid) {
      this.searchByString.emit(`?${form.value.filter}=${form.value.searchString}`);
    }
  }
}
*/
export class Search {}
