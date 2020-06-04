import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RecentCitiesComponent } from './recent-cities/recent-cities.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { ParamsInterceptor } from './params.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecentCitiesComponent,
    CityWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ParamsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
