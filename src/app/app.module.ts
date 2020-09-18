import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ChartsModule } from "ng2-charts";
import { CreatePollComponent } from "./components/create-poll/create-poll.component";
import { DisplayPollResultsComponent } from "./components/display-poll-results/display-poll-results.component";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./components/shared/shared.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { VoteEffect } from "./store/vote.effects";
import { VotePollComponent } from "./components/vote-poll/vote-poll.component";
import { VoteReducer } from "src/app/store/vote.reducers";
import { DataService } from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    DisplayPollResultsComponent,
    VotePollComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    ChartsModule,
    EffectsModule.forRoot([VoteEffect]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({ Vote: VoteReducer }),
    // Must be placed after StoreModule to be detectable by Redux Chrome DevTools.
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      name: "NgRx Store Polling App",
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
