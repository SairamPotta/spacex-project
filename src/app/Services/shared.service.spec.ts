import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService, httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService],
    });
    service = TestBed.get(SharedService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch spaceX records', () => {
    const dummyPosts = [
      [
        {
          flight_number: 1,
          mission_name: 'FalconSat',
          mission_id: [],
          upcoming: false,
          launch_year: '2006',
          launch_date_unix: 1143239400,
          launch_date_utc: '2006-03-24T22:30:00.000Z',
          launch_date_local: '2006-03-25T10:30:00+12:00',
          is_tentative: false,
          tentative_max_precision: 'hour',
          tbd: false,
          launch_window: 0
        }
      ]
    ];
    service.fetchDetails().subscribe((res: any[]) => {
      expect(res.length).toBe(1);
      expect(res).toBe(dummyPosts);
    });
    const request = httpMock.expectOne(
      'https://api.spacexdata.com/v3/launches?limit=100'
    );

    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });

  it('should fetch spaceX records by passing filter', () => {
    const dummyPosts = [
      [
        {
          flight_number: 1,
          mission_name: 'FalconSat',
          mission_id: [],
          upcoming: false,
          launch_year: '2006',
          launch_date_unix: 1143239400,
          launch_date_utc: '2006-03-24T22:30:00.000Z',
          launch_date_local: '2006-03-25T10:30:00+12:00',
          is_tentative: false,
          tentative_max_precision: 'hour',
          tbd: false,
          launch_window: 0
        }
      ]
    ];
    service.fetchDetails({launch_year: 2016}).subscribe((res: any[]) => {
      expect(res.length).toBe(1);
      expect(res).toBe(dummyPosts);
    });
    const request = httpMock.expectOne(
      'https://api.spacexdata.com/v3/launches?limit=100&launch_year=2016'
    );

    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });
});
