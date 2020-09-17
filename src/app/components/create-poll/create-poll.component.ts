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
import { Observable, Subscription } from "rxjs";
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
  public barChartLabels: Label[] = ["Results"];
  public editing: boolean = false;
  public idToEdit: number | null = null;
  public inputFieldValue: string = "";
  public question: string = "";

  // public barChartData: any = [{ data: [], label: "No Data" }];
  public barChartData: any = [];
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
    const someData: Subscription = this.store
      .pipe(select(selectVotes))
      .subscribe((votes) => {
        votes.map((vote) => {
          // TODO: What about when the store is empty?
          this.barChartData.push({ data: [0], label: vote.title });
          this.barChartData[vote.index].data = [0];
        });
      });
    someData.unsubscribe();
  }

  public onSubmit(): void {
    // if (this.barChartData[0].label == "No Data") {
    //   this.barChartData.shift();
    // }
    this.barChartData.push({
      data: [0],
      label: this.votesForm.controls.title.value,
    });
    this.store.dispatch(
      addVote({ title: this.votesForm.controls.title.value })
    );
    this.votesForm.controls.title.reset();
    this.inputFieldValue = "";
  }

  public deleteVote(deletedVote: Vote): void {
    this.barChartData.splice(deletedVote.index, 1);
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }

  public editToDo(vote: Vote): void {
    this.editing = true;
    this.inputFieldValue = vote.title;
    this.idToEdit = vote.index;
  }

  public cancelEdit(): void {
    this.editing = false;
    this.inputFieldValue = "";
    this.votesForm.controls.title.reset();
  }

  public editVote(vote2: string): void {
    const objectMe: Vote = { index: this.idToEdit, title: vote2 };
    this.store.dispatch(editVote({ vote: objectMe }));
    this.barChartData[this.idToEdit].label = vote2;
    this.inputFieldValue = "";
    this.editing = false;
  }

  public onVote(vote2: Vote) {
    this.barChartData[vote2.index].data = [
      +this.barChartData[vote2.index].data + 1,
    ];
  }
}
