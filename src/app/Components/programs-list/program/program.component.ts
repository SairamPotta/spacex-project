import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/Program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  @Input() programInput: Program;
  constructor() { }

  ngOnInit(): void {
  }

}
