import {
  addVote,
  deleteVote,
  editVote,
  getVotes,
  resetVotes,
} from "./../../store/vote.actions";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePollComponent implements AfterViewInit {
  public error$: Observable<any>;
  public question: string = "";
  public votes$: Observable<any>;
  public votesForm: FormGroup = new FormGroup({
    title: new FormControl(""),
  });
  messageeee: any = [];

  constructor(
    private changeDetection: ChangeDetectorRef,
    private dataService: DataService,
    private store: Store<{ Vote: { votes: Vote[] } }>
  ) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    // this.error$ = this.store.pipe(select(selectErrors));
  }

  public ngOnInit(): void {
    this.store.pipe(select(selectVotes)).subscribe((votes) => {
      votes.map((vote) => {
        this.messageeee.splice(vote.index, 1);
        this.messageeee[vote.index] = {
          index: vote.index,
          numberOfVotes: vote.numberOfVotes,
          title: vote.title,
        };
      });
      if (votes.length === 0) {
        this.messageeee = [];
      }
      this.dataService.sendVotes(votes);
    });
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

  public onReset(): void {
    this.store.dispatch(resetVotes());
  }

  public onChange(voteEdit: Vote) {
    this.store.dispatch(editVote({ vote: voteEdit }));
  }

  public deleteVote(deletedVote: Vote): void {
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }
}
