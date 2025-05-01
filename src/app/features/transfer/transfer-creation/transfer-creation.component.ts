import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '@enums/status.enum';
import { Account } from '@models/account.model';
import { Transfer } from '@models/transfer-details.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-creation',
  standalone: false,
  templateUrl: './transfer-creation.component.html',
  styleUrls: ['./transfer-creation.component.scss'],
})
export class TransferCreationComponent implements OnInit, OnDestroy {
  @Input() accounts: Account[] | null = [];
  @Input() transferStatus: Status | null = null;
  @Output() transferStatusChange = new EventEmitter<Status | null>();
  @Output() transferFunds = new EventEmitter<Transfer>();

  subscriptions: Subscription = new Subscription();
  STATUS = Status;

  transferForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: [new Date(), Validators.required],
      note: [''],
    });

    this.subscriptions.add(
      this.transferForm.valueChanges.subscribe(() => {
        this.transferStatusChange.emit(null);
      })
    );
  }

  getFromAccountBalance(): number | null {
    const accountNumber = this.transferForm.get('fromAccount')?.value;
    const account = this.accounts?.find(
      (acc) => acc.accountNumber === accountNumber
    );
    return account ? account.balance : null;
  }

  getToAccountBalance(): number | null {
    const accountNumber = this.transferForm.get('toAccount')?.value;
    const account = this.accounts?.find(
      (acc) => acc.accountNumber === accountNumber
    );
    return account ? account.balance : null;
  }

  onSubmit(): void {
    if (!this.transferForm.valid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const { fromAccount, toAccount, amount } = this.transferForm.value;
    const fromAcc = this.accounts?.find(
      (acc) => acc.accountNumber === fromAccount
    );

    if (fromAccount === toAccount) {
      this.transferForm.get('toAccount')?.setErrors({ sameAccount: true });
      return;
    }

    if (fromAcc && fromAcc.balance < amount) {
      this.transferForm.get('amount')?.setErrors({ insufficientFunds: true });
      return;
    }
    this.transferStatusChange.emit(Status.PENDING);
    this.transferFunds.emit(this.transferForm.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  get fromAccount() {
    return this.transferForm.get('fromAccount');
  }

  get toAccount() {
    return this.transferForm.get('toAccount');
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  get date() {
    return this.transferForm.get('date');
  }

  get note() {
    return this.transferForm.get('note');
  }
}
