import { getVotes } from "./../../store/vote.actions";
import { ChartOptions, ChartType } from "chart.js";
import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/data.service";
import { Label } from "ng2-charts";
import { Observable } from "rxjs/internal/Observable";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-display-poll-results",
  templateUrl: "./display-poll-results.component.html",
  styleUrls: ["./display-poll-results.component.scss"],
})
export class DisplayPollResultsComponent implements OnInit {
  public barChartData: any = [];
  public barChartLabels: Label[] = ["Results2"];
  public barChartLegend: boolean = true;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = "bar";
  public error$: Observable<any>;
  public votes$: Observable<any>;

  constructor(
    private data: DataService,
    private store: Store<{ Vote: { votes: Vote[] } }>
  ) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    this.error$ = this.store.pipe(select(selectErrors));
  }

  public ngOnInit(): void {
    this.store.pipe(select(selectVotes)).subscribe((votes) => {
      votes.map((vote) => {
        // TODO: What about when the store is empty?
        // if (this.barChartData[vote.index] === vote) return;
        this.barChartData[vote.index] = {
          data: [vote.numberOfVotes],
          label: vote.title,
        };
        // this.barChartData.splice(vote.index, 1); // for delete
      });
      this.data.sendVotes(votes);
    });
  }
}
