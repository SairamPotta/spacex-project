import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Program } from 'src/app/models/Program';
import { SharedService } from 'src/app/Services/shared.service';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  programsList: Program[];
  constructor(private _service: SharedService) { }

  ngOnInit(): void {
    this.fetchDetails();
  }

  /**
   * Apply the filter and fetch the details
   * @param event Filter event
   */
  filterData(event) {
    if (event) {
      this.fetchDetails(event);
    } else {
      this.fetchDetails();
    }
  }

  /**
   * Fetch the details from the server by making XHR request
   * @param event filter event
   */
  fetchDetails(event?: any) {
    this.programsList = null;
    this._service.fetchDetails(event).subscribe((res: any) => {
      this.programsList = [];
      if (res && res.length > 0) {
        this.filterResponse(res);
      } 
    }, (error: HttpErrorResponse) => {
      this.programsList = [];
      console.log(error);
    });
  }

  /**
   * Filter the response and assign to the Program list
   * @param response XHR Response
   */
  filterResponse(response) {
    response.forEach(ele => {
      const { flight_number, mission_name, mission_id, launch_year, launch_success, links: { mission_patch_small } } = ele;
      const { rocket: {first_stage : cores} } = ele;
      let landing_success = null;
      if (cores.cores && cores.cores.length > 0) {
        landing_success = cores.cores.map(ele => ele.land_success).indexOf(true) > -1;
      }
      const programm = {
        flight_number,
        mission_name,
        mission_id,
        launch_year,
        launch_success,
        landing_success,
        mission_patch_small
      };
      this.programsList.push(programm);
    });
  }



}
