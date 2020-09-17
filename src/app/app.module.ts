import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ChartsModule } from "ng2-charts";
import { CreatePollComponent } from "./components/create-poll/create-poll.component";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { VoteEffect } from "./store/vote.effects";
import { VoteReducer } from "src/app/store/vote.reducers";

@NgModule({
  declarations: [AppComponent, CreatePollComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    ChartsModule,
    EffectsModule.forRoot([VoteEffect]),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ Vote: VoteReducer }),
    // Must be placed after StoreModule to be detectable by Redux Chrome DevTools.
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      name: "NgRx Store Polling App",
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
