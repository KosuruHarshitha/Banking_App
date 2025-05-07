import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AccountType } from '@enums/account-type.enum';
import { Account } from '@models/account.model';
import { customAlphabet } from 'nanoid';
import { Status } from '@enums/status.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-creation',
  standalone: false,
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent implements OnInit, OnDestroy {
  @Input() accountCreationStatus: Status | null = null;
  @Output() accountCreationStatusChange = new EventEmitter<Status | null>();
  @Output() createAccount = new EventEmitter<Account>();

  STATUS = Status;

  subscriptions: Subscription = new Subscription();
  accountForm: FormGroup | undefined;
  accountTypes = AccountType;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9 ]+$/),
        ],
      ],
      initialDeposit: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(10000000),
          this.numericValidator,
        ],
      ],
      accountType: [
        AccountType.CHEQUING,
        [
          Validators.required,
          Validators.pattern(
            `^(${AccountType.CHEQUING}|${AccountType.SAVINGS})$`
          ),
        ],
      ],
    });
    this.subscriptions.add(
      this.accountForm.valueChanges.subscribe(() => {
        this.accountCreationStatusChange.emit(null);
      })
    );
  }

  numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return isNaN(value) ? { notANumber: true } : null;
  }

  onSubmit() {
    if (!this.accountForm?.valid) {
      this.accountForm?.markAllAsTouched();
      return;
    }
    this.accountCreationStatusChange.emit(Status.PENDING);
    let newAccountDetails = this.buildAccount();

    if (newAccountDetails) {
      this.createAccount.emit(newAccountDetails);
    }
  }
  buildAccount(): Account | null {
    const formValues = this.accountForm?.value;
    let account = null;
    if (formValues) {
      let date = new Date();
      const uniqueNumber = customAlphabet('0123456789', 10)();
      account = {
        accountName: formValues.accountName,
        accountNumber: uniqueNumber,
        accountType: formValues.accountType,
        depositAmount: formValues.initialDeposit,
        balance: formValues.initialDeposit,
        dateCreated: date,
        dateUpdated: date,
      };
    }
    return account;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getButtonColor(): 'primary' | 'accent' {
    const accountType = this.accountType?.value;
    if (accountType === AccountType.SAVINGS) {
      return 'accent';
    }
    return 'primary';
  }

  get accountName() {
    return this.accountForm?.get('accountName');
  }

  get initialDeposit() {
    return this.accountForm?.get('initialDeposit');
  }

  get accountType() {
    return this.accountForm?.get('accountType');
  }

  get accountOption() {
    return this.accountForm?.get('accountOption');
  }
}
