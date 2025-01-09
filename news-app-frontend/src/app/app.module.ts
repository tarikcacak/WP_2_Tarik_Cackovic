import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {CalendarComponent} from './dashboard/calendar/calendar.component';
import {AdminComponent} from './admin/admin.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FooterComponent} from './dashboard/footer/footer.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NewsComponent,
    CalendarComponent,
    AdminComponent,
    ChangePasswordComponent,
    FooterComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
