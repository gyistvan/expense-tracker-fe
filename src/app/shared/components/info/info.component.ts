import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
  @Input() public infoTitle!: string;
  @Input() public infoDescription!: string;

  constructor() {}

  ngOnInit(): void {}
}
