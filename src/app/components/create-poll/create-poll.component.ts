import { addVote, deleteVote, getVotes } from "./../../store/vote.actions";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Label } from "ng2-charts";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"],
})
export class CreatePollComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
  ];

  public error$: Observable<any>;
  public votesLength = this.store.dispatch(getVotes());
  public votes$: Observable<any>;
  public votesForm: FormGroup = new FormGroup({
    title: new FormControl(""),
  });

  constructor(private store: Store<{ Vote: { votes: Vote[] } }>) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    this.error$ = this.store.pipe(select(selectErrors));
  }

  public onSubmit(): void {
    this.store.dispatch(
      addVote({ title: this.votesForm.controls.title.value })
    );
    this.votesForm.controls.title.reset();
  }

  public deleteVote(deletedVote: Vote): void {
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }
}
