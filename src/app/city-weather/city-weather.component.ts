import { environment as env } from './../../environments/environment';
import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {
  weatherForecastList: any = [];
  selectedCityDetail: any = {};
  iconUrl = env.weatherIconUrl;
  process = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.selectedCity$.subscribe(
      data => {
        this.process = false;
        if (data) {
          if (this.weatherService.selectedCityName === data.name) {
            this.selectedCityDetail = data;
            this.getWeatherForecast(this.selectedCityDetail.id);
          }
        } else {
          this.selectedCityDetail = {};
          this.weatherForecastList.length = 0;
        }
      },
      err => {
        this.process = false;
      }
    );
  }

  getWeatherForecast(cityId) {
    this.weatherService.getWeatherForecast(cityId).subscribe(data => {
      this.weatherForecastList = data;
    });
  }

  refreshWeatherDetail() {
    this.process = true;
    this.weatherService.getCityWeather(this.selectedCityDetail.name);
  }

}
