import { errorItem, loadVotes } from "./vote.actions";
import { createReducer, on } from "@ngrx/store";
import { initialState, VoteState } from "./vote.state";

export const VoteReducer = createReducer(
  initialState,
  on(loadVotes, (state, action) => ({
    ...state,
    votes: action.votes,
  })),
  on(errorItem, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export const selectVotes = (state: VoteState) => state.Vote.votes;
export const selectErrors = (state: VoteState) => state.Vote.errors;
