import {
  deleteVote,
  editVote,
  getVotes,
  incrementVote,
} from "./../../store/vote.actions";
import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../services/data.service";
import { Observable } from "rxjs/internal/Observable";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-vote-poll",
  templateUrl: "./vote-poll.component.html",
  styleUrls: ["./vote-poll.component.scss"],
})
export class VotePollComponent implements OnInit {
  messageeee: any = [];
  public barChartData: any = [];
  public editing: boolean = false;
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
        this.messageeee[vote.index] = {
          index: vote.index,
          numberOfVotes: vote.numberOfVotes,
          title: vote.title,
        };
      });
      this.data.sendVotes(votes);
    });
  }

  public onChange(voteEdit: Vote) {
    this.store.dispatch(editVote({ vote: voteEdit }));
  }

  public deleteVote(deletedVote: Vote): void {
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }

  public onVote(vote2: Vote) {
    this.store.dispatch(incrementVote({ vote: vote2 }));
  }
}
