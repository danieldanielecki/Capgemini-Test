import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vote } from "../models/vote.model";

@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  sendVotes(votes: Vote[]) {
    this.messageSource.next(votes);
  }
}
