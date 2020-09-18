import { Injectable } from "@angular/core";
import { Vote } from "../models/vote.model";

@Injectable({
  providedIn: "root",
})
export class VoteService {
  public addVote(voteToAdd: string): void {
    const votesStored = window.localStorage.getItem("votes");
    let votes = [];

    if (votesStored !== null) {
      votes = JSON.parse(votesStored);
    }
    const vote: Vote = {
      index: votes.length,
      numberOfVotes: 0,
      title: voteToAdd,
    };
    votes.push(vote);
    window.localStorage.setItem("votes", JSON.stringify(votes));
  }

  public deleteVote(voteToDelete): void {
    const votes: any[] = JSON.parse(window.localStorage.getItem("votes"));
    const saved = votes.filter((vote) => {
      return vote.index !== voteToDelete.index;
    });

    // That's basically to keep the right data with the right vote.
    let newVotesArray: Vote[] = [];
    let newVoteIndex: number = 0;
    saved.forEach((item) => {
      newVotesArray.push({
        index: newVoteIndex,
        numberOfVotes: item.numberOfVotes,
        title: item.title,
      });
      newVoteIndex++;
    });
    window.localStorage.setItem("votes", JSON.stringify(newVotesArray));
  }

  public editVote(voteToEdit): void {
    const votes: any = JSON.parse(window.localStorage.getItem("votes"));
    const indexOfVoteToEdit = votes.findIndex(
      (vote) => vote.index === voteToEdit.index
    );
    votes[indexOfVoteToEdit].title = voteToEdit.title;
    window.localStorage.setItem("votes", JSON.stringify(votes));
  }

  public getVotes() {
    let votes: object = JSON.parse(window.localStorage.getItem("votes"));

    if (votes === null) {
      votes = [];
    }
    return votes;
  }

  public incrementVote(voteToIncrement: Vote): void {
    const votesStored: object = JSON.parse(
      window.localStorage.getItem("votes")
    );
    votesStored[voteToIncrement.index].numberOfVotes += 1;
    window.localStorage.setItem("votes", JSON.stringify(votesStored));
  }

  public resetVotes(): void {
    window.localStorage.clear();
  }
}
