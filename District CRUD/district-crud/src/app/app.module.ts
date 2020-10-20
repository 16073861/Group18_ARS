import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClubComponent } from './club/club.component';
import { DistrictComponent } from './district/district.component';
import { FederationComponent } from './federation/federation.component';
import { LeagueComponent } from './league/league.component';
import { SeasonComponent } from './season/season.component';
import { VenueComponent } from './venue/venue.component';
import { DistrictService } from './district.service';
import { DistrictAddComponent } from './district/district-add/district-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DistrictEditComponent } from './district/district-edit/district-edit.component';
import { AthleteComponent } from './athlete/athlete.component';
import { ClubAddComponent } from './club/club-add/club-add.component';
import { ClubEditComponent } from './club/club-edit/club-edit.component';
import { FederationEditComponent } from './federation/federation-edit/federation-edit.component';
import { FederationAddComponent } from './federation/federation-add/federation-add.component';
import { LeagueAddComponent } from './league/league-add/league-add.component';
import { LeagueEditComponent } from './league/league-edit/league-edit.component';
import { SeasonAddComponent } from './season/season-add/season-add.component';
import { SeasonEditComponent } from './season/season-edit/season-edit.component';
import { VenueAddComponent } from './venue/venue-add/venue-add.component';
import { VenueEditComponent } from './venue/venue-edit/venue-edit.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitionAddComponent } from './competition/competition-add/competition-add.component';
import { CompetitionEditComponent } from './competition/competition-edit/competition-edit.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ForgotPaasswordComponent } from './user/forgot-paassword/forgot-paassword.component';
import { ForbiddenComponent } from './user/forbidden/forbidden.component';
import { DashboardComponent } from './other/dashboard/dashboard.component';
import { DialogComponent } from './other/dialog/dialog.component';
import { ProfileComponent } from './other/profile/profile.component';
import { GetProfileComponent } from './other/get-profile/get-profile.component';
import { LandingpageComponent } from './other/landingpage/landingpage.component';
import { CoachComponent } from './coach/coach.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { PerformanceComponent } from './competition/performance/performance.component';
import { PerformanceAddComponent } from './competition/performance/performance-add/performance-add.component';
import { PerformanceEditComponent } from './competition/performance/performance-edit/performance-edit.component';
import { ProgramComponent } from './program/program.component';
import { UpdateprogramComponent } from './program/updateprogram/updateprogram.component';
import { AddprogramComponent } from './program/addprogram/addprogram.component';
import { AthleteAddComponent } from './athlete/athlete-add/athlete-add.component';
import { AthleteEditComponent } from './athlete/athlete-edit/athlete-edit.component';
import { ProgramAddComponent } from './coach/program-add/program-add.component';
import { ProgramEditComponent } from './coach/program-edit/program-edit.component';
import { GlobalService } from './global.service';
import { RegisterService } from './register.service';
import { BackupComponent } from './backup/backup.component';
import { AuthGuard } from './auth.guard';
import { HelpComponent } from './help/help.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AlertModule } from './_alert';
import { WeatherService } from './weather.service';
import { DataTablesModule } from 'angular-datatables';
import { AthleteperfComponent } from './athlete/athleteperf/athleteperf.component';
import { AthleteReportComponent } from './Reports/athlete-report/athlete-report.component';
import { CompetitionReportComponent } from './Reports/competition-report/competition-report.component';
import { CompetitionResultsComponent } from './Reports/competition-results/competition-results.component';
import { RecordReportComponent } from './Reports/record-report/record-report.component';
import { SeasonRankingComponent } from './Reports/season-ranking/season-ranking.component';
import { TopListsComponent } from './Reports/top-lists/top-lists.component';
import { ReportlandingComponent } from './Reports/reportlanding/reportlanding.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { EventComponent } from './event/event.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ClubComponent,
    DistrictComponent,
    FederationComponent,
    LeagueComponent,
    SeasonComponent,
    VenueComponent,
    DistrictAddComponent,
    DistrictEditComponent,
    AthleteComponent,
    ClubAddComponent,
    ClubEditComponent,
    FederationEditComponent,
    FederationAddComponent,
    LeagueAddComponent,
    LeagueEditComponent,
    SeasonAddComponent,
    SeasonEditComponent,
    VenueAddComponent,
    VenueEditComponent,
    CompetitionComponent,
    CompetitionAddComponent,
    CompetitionEditComponent,
    UserComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ForgotPaasswordComponent,
    ForbiddenComponent,
    DashboardComponent,
    DialogComponent,
    ProfileComponent,
    GetProfileComponent,
    LandingpageComponent,
    CoachComponent,
    AdminComponent,
    CreateAdminComponent,
    EditAdminComponent,
    PerformanceComponent,
    PerformanceAddComponent,
    PerformanceEditComponent,
    ProgramComponent,
    UpdateprogramComponent,
    AddprogramComponent,
    AthleteAddComponent,
    AthleteEditComponent,
    ProgramAddComponent,
    ProgramEditComponent,
    BackupComponent,
    HelpComponent,
    AthleteperfComponent,
    AthleteReportComponent,
    CompetitionReportComponent,
    CompetitionResultsComponent,
    RecordReportComponent,
    SeasonRankingComponent,
    TopListsComponent,
    ReportlandingComponent,
    AuditTrailComponent,
    EventComponent,
    EventAddComponent,
    EventEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PdfViewerModule,
    AlertModule,
    DataTablesModule
  ],
  providers: [DistrictService, GlobalService, RegisterService, AuthGuard, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
