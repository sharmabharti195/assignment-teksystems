import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recent-cities',
  templateUrl: './recent-cities.component.html',
  styleUrls: ['./recent-cities.component.css']
})
export class RecentCitiesComponent implements OnInit {
  cityname: string;
  recentCities = [];
  iconUrl = env.weatherIconUrl;
  process = false;
  selectedCityName: string;
  constructor(
    private weatherService: WeatherService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.weatherService.selectedCity$.subscribe(
      data => {
        this.process = false;
        if (data) {
          const index = this.recentCities.findIndex(e => e.name === data.name);
          if (index !== -1) {
            this.recentCities[index] = data;
          } else {
            this.weatherService.selectedCityName = data.name;
            this.recentCities.unshift(data);
            if (this.recentCities.length > 8) {
              this.recentCities.pop();
            }
          }
        }
        this.cityname = '';
      },
      err => {
        this.process = false;
      }
    );
  }

  getCityWeather(cityname): void {
    if (!cityname) {
      this.toaster.error('Please enter a city name.');
      return;
    }
    this.weatherService.getCityWeather(cityname);
  }

  selectCity(cityDetail) {
    this.weatherService.selectedCityName = cityDetail.name;
    this.weatherService.selectedCity.next(cityDetail);
  }

  refreshCity(cityname) {
    this.selectedCityName = cityname;
    this.process = true;
    this.weatherService.getCityWeather(cityname);
  }

  removeCity(i) {
    const currentCity = this.recentCities[i];
    this.recentCities.splice(i, 1);
    let nextEle: any;
    if (currentCity.name === this.weatherService.selectedCityName) {
      if (this.recentCities.length > 0) {
        if (i > 0) {
          nextEle = this.recentCities[i - 1];
        } else {
          nextEle = this.recentCities[i];
        }
        this.weatherService.selectedCityName = nextEle.name;
      }
      this.weatherService.selectedCity.next(nextEle);
    }
  }

  clearAllCities() {
    this.recentCities.length = 0;
    this.weatherService.selectedCity.next();
  }

}
