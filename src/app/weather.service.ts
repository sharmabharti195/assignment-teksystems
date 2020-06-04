import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  /*
  city obervable to update selected city weather details on
  refresh from the components
  */
  selectedCity: Subject<any> = new Subject();
  selectedCity$ = this.selectedCity.asObservable();
  selectedCityName: string;
  constructor(
    private http: HttpClient,
    private toaster: ToastrService
    ) { }

  getCityWeatherApi(city): Observable<any> {
    let params = new HttpParams();
    params = params.append('q', city);
    return this.http.get(`${env.api}/weather`, {params});
  }

  getWeatherForecast(cityId) {
    let params = new HttpParams();
    params = params.append('id', cityId);
    params = params.append('cnt', '5');
    return this.http.get(`${env.api}/forecast/daily`, {params});
  }

  getCityWeather(cityname) {
    this.getCityWeatherApi(cityname).subscribe(
      data => {
        this.selectedCity.next(data);
      },
      err => {
        this.selectedCity.next();
        if (err.error.cod === '404') {
          this.toaster.error('Please provide a valid city name.');
        } else {
          this.toaster.error(err.error.message);
        }
      }
    );
  }
}
