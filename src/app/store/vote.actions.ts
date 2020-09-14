import { createAction, props } from "@ngrx/store";
import { Vote } from "./../models/vote.model";
import { VotesActionTypes } from "./vote.actions.types";

export const getVotes = createAction(VotesActionTypes.GET_VOTES);

export const loadVotes = createAction(
  VotesActionTypes.LOAD_VOTES,
  props<{ votes: Vote[] }>()
);

export const addVote = createAction(
  VotesActionTypes.ADD_VOTE,
  props<{ title: string }>()
);

export const deleteVote = createAction(
  VotesActionTypes.DELETE_VOTE,
  props<{ vote: Vote }>()
);

export const errorItem = createAction(
  VotesActionTypes.ERROR_VOTE,
  props<{ error: string }>()
);

export const editVote = createAction(
  VotesActionTypes.EDIT_VOTE,
  props<{ vote: Vote }>()
);
