import { Component } from '@angular/core';
import { Status } from '@enums/status.enum';
import { Account } from '@models/account.model';
import { AccountService } from '@services/account.service';
import { delay, Observable, take } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  accounts$: Observable<Account[]>;
  accountCreationStatus: Status | null = null;

  constructor(private accountService: AccountService) {
    this.accounts$ = this.accountService.getAccounts();
  }

  createAccount(accountDetails: Account) {
    this.accountService
      .createAccount(accountDetails)
      .pipe(take(1), delay(3000))
      .subscribe({
        next: () => {
          this.accountCreationStatus = Status.SUCCESS;
        },
        error: () => {
          this.accountCreationStatus = Status.FAILED;
        },
      });
  }
}
