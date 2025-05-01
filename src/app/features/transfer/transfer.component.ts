import { Component } from '@angular/core';
import { Status } from '@enums/status.enum';
import { Account } from '@models/account.model';
import { Transfer } from '@models/transfer-details.model';
import { AccountService } from '@services/account.service';
import { delay, Observable, take } from 'rxjs';

@Component({
  selector: 'app-transfer',
  standalone: false,
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent {
  accounts$: Observable<Account[]>;
  lastestTransfers$: Observable<Transfer[]>;
  transferStatus: Status | null = null;

  constructor(private accountService: AccountService) {
    this.accounts$ = this.accountService.getAccounts();
    this.lastestTransfers$ = this.accountService.getLatestTransfers();
  }

  transferFunds(transferDetails: Transfer) {
    this.accountService
      .transferFunds(transferDetails)
      .pipe(take(1), delay(3000))
      .subscribe({
        next: () => {
          this.transferStatus = Status.SUCCESS;
        },
        error: () => {
          this.transferStatus = Status.FAILED;
        },
      });
  }
}
