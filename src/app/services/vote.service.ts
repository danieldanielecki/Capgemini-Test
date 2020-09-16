import { Injectable } from "@angular/core";
import { Vote } from "../models/vote.model";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  constructor() {}

  getVotes() {
    let votes = JSON.parse(window.localStorage.getItem("votes"));

    if (votes === null) {
      votes = [];
    }
    return votes;
  }

  addVote(addVote: string) {
    const votesStored = window.localStorage.getItem("votes");
    let votes = [];

    if (votesStored !== null) {
      votes = JSON.parse(votesStored);
    }
    const vote: Vote = {
      index: votes.length,
      title: addVote,
    };
    votes.push(vote);
    window.localStorage.setItem("votes", JSON.stringify(votes));
  }

  deleteVote(deleteVote) {
    const votes = JSON.parse(window.localStorage.getItem("votes"));
    console.log(votes);
    console.log(deleteVote);
    const saved = votes.filter((vote) => {
      return vote.index !== deleteVote.index;
    });
    window.localStorage.setItem("votes", JSON.stringify(saved));
  }

  editVote(deleteVote) {
    const votes = JSON.parse(window.localStorage.getItem("votes"));
    const zzz = votes.findIndex((vote) => vote.index === deleteVote.index);
    votes[zzz].title = deleteVote.title;
    window.localStorage.setItem("votes", JSON.stringify(votes));
  }
}
