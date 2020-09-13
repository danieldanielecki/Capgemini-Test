import { Vote } from "../models/vote.model";

export interface VoteState {
  Vote: {
    errors: Error;
    votes: Vote[];
  };
}

export const initialState: VoteState = {
  Vote: {
    errors: null,
    votes: [],
  },
};
