import { Injectable } from "@angular/core";
import { Vote } from "../models/vote.model";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  getVotes() {
    let votes = JSON.parse(window.localStorage.getItem("votes"));

    if (votes === null) {
      votes = [];
    }
    return votes;
  }

  incrementVote(vote: Vote) {
    const votesStored = JSON.parse(window.localStorage.getItem("votes"));
    votesStored[vote.index].numberOfVotes += 1;
    window.localStorage.setItem("votes", JSON.stringify(votesStored));
  }

  addVote(addVote: string) {
    const votesStored = window.localStorage.getItem("votes");
    let votes = [];

    if (votesStored !== null) {
      votes = JSON.parse(votesStored);
    }
    const vote: Vote = {
      index: votes.length,
      numberOfVotes: 0,
      title: addVote,
    };
    votes.push(vote);
    window.localStorage.setItem("votes", JSON.stringify(votes));
  }

  deleteVote(deleteVote) {
    const votes = JSON.parse(window.localStorage.getItem("votes"));
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
