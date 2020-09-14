import {
  addVote,
  deleteVote,
  editVote,
  getVotes,
} from "./../../store/vote.actions";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Component, OnInit } from "@angular/core";
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
export class CreatePollComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = "bar";
  public barChartLegend: boolean = true;
  public barChartLabels: Label[] = [""];

  public barChartData: any = [
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
    { data: [0], label: "" },
  ];
  public error$: Observable<any>;
  public votes$: Observable<any>;
  public votesForm: FormGroup = new FormGroup({
    title: new FormControl(""),
  });

  constructor(private store: Store<{ Vote: { votes: Vote[] } }>) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    this.error$ = this.store.pipe(select(selectErrors));
  }

  public ngOnInit(): void {
    this.store.pipe(select(selectVotes)).subscribe((votes) => {
      votes.map((vote) => {
        // if (item === null) {
        //   this.barChartData = [{ data: [2, 3, 4], label: "Sessions" }];
        // }
        // console.log(item);
        this.barChartData[vote.id - 1].label = vote.title;
        console.log(vote);
      });
    });
  }

  public onSubmit(): void {
    this.newDataPoint([0], this.votesForm.controls.title.value);
    this.store.dispatch(
      addVote({ title: this.votesForm.controls.title.value })
    );
    this.votesForm.controls.title.reset();
  }

  public deleteVote(deletedVote: Vote): void {
    const index = this.barChartLabels.indexOf(deletedVote.title);
    this.barChartLabels.splice(index, 1);
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }

  public editVote(vote2: Vote): void {
    const index = this.barChartLabels.indexOf(vote2.title);
    this.barChartLabels.splice(index, 1);
    this.store.dispatch(editVote({ vote: vote2 }));
  }

  public onVote(vote2: Vote) {
    const index = this.barChartLabels.indexOf(vote2.title);
    this.barChartData[index] = Object.assign({}, this.barChartData[index], {
      data: [
        ...this.barChartData[index].data,
        +this.barChartData[0].data[index]++,
      ],
    });
  }

  public newDataPoint(dataArr = [0], label) {
    this.barChartData.forEach((dataset, index) => {
      this.barChartData[index] = Object.assign({}, this.barChartData[index], {
        data: [...this.barChartData[index].data, dataArr[index]],
      });
    });

    this.barChartLabels = [...this.barChartLabels, label];
  }
}
