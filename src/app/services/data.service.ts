import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vote } from "../models/vote.model";

@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private messageSource2 = new BehaviorSubject({});
  currentMessage2 = this.messageSource2.asObservable();

  constructor() {}

  sendVotes(votes: Vote[]) {
    this.messageSource.next(votes);
  }

  sendVote(vote: Vote) {
    this.messageSource2.next(vote);
  }
}
