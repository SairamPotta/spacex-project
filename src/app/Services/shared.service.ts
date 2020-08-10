import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http: HttpClient) { }

  fetchDetails(event?: any) {
    let filterOptions = '';
    if (event) {
      const key = Object.keys(event);
      key.forEach(ele => {
        filterOptions += `&${ele}=${event[ele]}`;
      });
    }
    return this._http.get('https://api.spacexdata.com/v3/launches?limit=100' + filterOptions);
  }
}
