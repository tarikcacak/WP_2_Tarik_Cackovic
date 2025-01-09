import { Component } from '@angular/core';
import {NewsComponent} from '../news/news.component';
import {CalendarComponent} from './calendar/calendar.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    NewsComponent,
    CalendarComponent,
    FooterComponent
  ]
})
export class DashboardComponent {}

