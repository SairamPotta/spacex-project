import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Program } from '../../models/Program';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  @Input() programsList;
  constructor() { }

  ngOnInit(): void {
  }

  

}
