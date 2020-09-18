import {
  addVote,
  deleteVote,
  editVote,
  getVotes,
  resetVotes,
} from "./../../store/vote.actions";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { DataService } from "src/app/services/data.service";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectErrors, selectVotes } from "./../../store/vote.reducers";
import { Vote } from "./../../models/vote.model";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePollComponent implements AfterViewInit {
  public error$: Observable<any>;
  public maxNumberOfAnswers: number = 10;
  public question: string = "";
  public votes$: Observable<any>;
  messageeee: any = [];
  public votesForm: FormGroup = this.formBuilder.group({
    formControlVoteName: [
      "",
      Validators.compose([
        Validators.maxLength(80),
        Validators.minLength(1),
        Validators.required,
      ]),
    ],
  });
  public questionForm: FormGroup = this.formBuilder.group({
    formControlQuestionName: [
      "",
      Validators.compose([
        Validators.maxLength(80),
        Validators.minLength(1),
        Validators.required,
      ]),
    ],
  });

  constructor(
    private changeDetection: ChangeDetectorRef,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private store: Store<{ Vote: { votes: Vote[] } }>
  ) {
    this.store.dispatch(getVotes());
    this.votes$ = this.store.pipe(select(selectVotes));
    // this.error$ = this.store.pipe(select(selectErrors));
  }

  public ngOnInit(): void {
    this.store.pipe(select(selectVotes)).subscribe((votes) => {
      votes.map((vote) => {
        this.messageeee.splice(vote.index, 1);
        this.messageeee[vote.index] = {
          index: vote.index,
          numberOfVotes: vote.numberOfVotes,
          title: vote.title,
        };
      });
      if (votes.length === 0) {
        this.messageeee = [];
      }
      this.dataService.sendVotes(votes);
    });
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    this.store.dispatch(
      addVote({ title: this.votesForm.controls.formControlVoteName.value })
    );
    this.votesForm.controls.formControlVoteName.reset();
    formDirective.resetForm(); // Reset validators (workaround to #4190 (https://github.com/angular/components/issues/4190).
  }

  public ngAfterViewInit(): void {
    this.changeDetection.detectChanges();
  }

  public onReset(): void {
    this.store.dispatch(resetVotes());
  }

  public onChange(voteEdit: Vote) {
    if (voteEdit.title !== "") {
      this.store.dispatch(editVote({ vote: voteEdit }));
    }
  }

  public deleteVote(deletedVote: Vote): void {
    this.store.dispatch(deleteVote({ vote: deletedVote }));
  }
}
