import { addVote, getVotes } from "./../../store/vote.actions";
import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"],
})
export class CreatePollComponent implements AfterViewInit {
  public error$: Observable<any>;
  public question: string = "";
  public votes$: Observable<any>;
  public votesForm: FormGroup = new FormGroup({
    title: new FormControl(""),
  });

  constructor(
    private changeDetection: ChangeDetectorRef,
    private store: Store<{ Vote: { votes: Vote[] } }>
  ) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    // this.error$ = this.store.pipe(select(selectErrors));
  }

  public onSubmit(): void {
    this.store.dispatch(
      addVote({ title: this.votesForm.controls.title.value })
    );
    this.votesForm.controls.title.reset();
  }

  public ngAfterViewInit(): void {
    this.changeDetection.detectChanges();
  }
}
