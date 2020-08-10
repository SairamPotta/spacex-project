import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from 'src/app/Services/shared.service';
import { FiltersComponent } from '../filters/filters.component';
import { ProgramsListComponent } from '../programs-list/programs-list.component';
import { HomePageComponent } from './home-page.component';
import { of, throwError } from 'rxjs';


describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, FiltersComponent, ProgramsListComponent ],
      imports: [HttpClientModule],
      providers: [
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch spaceX records', () => {
    const service: SharedService = fixture.debugElement.injector.get(SharedService);
    const response = [
      {
        "flight_number": 1,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2006",
        "launch_success": false,
        "links": {
          "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
        },
        "rocket": {
          "first_stage": {
            "cores": [
              {
              "land_success": null,
              }
            ]
          }
        }
      },
      {
        "flight_number": 2,
        "mission_name": "FalconSat",
        "mission_id": [],
        "launch_year": "2006",
        "launch_success": true,
        "links": {
          "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
        },
        "rocket": {
          "first_stage": {
            "cores": []
          }
        }
      }
    ]
    spyOn(service, 'fetchDetails').and.returnValue(of(response));
    component.ngOnInit();
    expect(component.programsList.length).toBe(2);
  });

  it('should to fetch the empty spaceX records', () => {
    const service: SharedService = fixture.debugElement.injector.get(SharedService);
    spyOn(service, 'fetchDetails').and.returnValue(of([]));
    component.ngOnInit();
    expect(component.programsList.length).toBe(0);
  });

  it('should failed to fetch the spaceX records', () => {
    const service: SharedService = fixture.debugElement.injector.get(SharedService);
    const error = {} as HttpErrorResponse;
    spyOn(service, 'fetchDetails').and.returnValue(throwError(error));
    component.ngOnInit();
    expect(component.programsList.length).toBe(0);
  });

  it('should call filter data by passing empty data', () => {
    spyOn(component, 'fetchDetails');
    component.filterData('');
    expect(component.fetchDetails).toHaveBeenCalled();
  });

  it('should call filter data by passing data', () => {
    spyOn(component, 'fetchDetails');
    component.filterData({data: ''});
    expect(component.fetchDetails).toHaveBeenCalled();
  });
});
