import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addVote, deleteVote, getVotes } from "./vote.actions";
import { catchError, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { VoteService } from "./../services/vote.service";
import { VotesActionTypes } from "./vote.actions.types";

@Injectable()
export class VoteEffect {
  loadVotes$ = createEffect(() =>
    this.$actions.pipe(
      ofType(getVotes),
      switchMap((action) => {
        const votesLoaded = this.voteService.getVotes();
        return of({ type: VotesActionTypes.LOAD_VOTES, votes: votesLoaded });
      }),
      catchError((error) =>
        of({ type: VotesActionTypes.ERROR_VOTE, error: error })
      )
    )
  );

  addVote$ = createEffect(() =>
    this.$actions.pipe(
      ofType(addVote),
      switchMap((action) => {
        this.voteService.addVote(action.title);
        const votesLoaded = this.voteService.getVotes();
        return of({ type: VotesActionTypes.LOAD_VOTES, votes: votesLoaded });
      }),
      catchError((error) =>
        of({ type: VotesActionTypes.ERROR_VOTE, error: error })
      )
    )
  );

  deleteVote$ = createEffect(() =>
    this.$actions.pipe(
      ofType(deleteVote),
      switchMap((action) => {
        this.voteService.deleteVote(action.vote);
        const votesLoaded = this.voteService.getVotes();
        return of({ type: VotesActionTypes.LOAD_VOTES, votes: votesLoaded });
      }),
      catchError((error) =>
        of({ type: VotesActionTypes.ERROR_VOTE, error: error })
      )
    )
  );

  constructor(private $actions: Actions, private voteService: VoteService) {}
}
