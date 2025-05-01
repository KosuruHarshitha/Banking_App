import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Account } from '@models/account.model';
import { Transfer } from '@models/transfer-details.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [];
  private transfers: Transfer[] = [];
  private accountsSubject = new BehaviorSubject<Account[]>(this.accounts);
  private transfersSubject = new BehaviorSubject<Transfer[]>(this.transfers);

  constructor() {}

  createAccount(accountDetails: Account): Observable<boolean> {
    this.accounts.push(accountDetails);
    this.accountsSubject.next(this.accounts);
    return new BehaviorSubject<boolean>(true).asObservable();
  }

  updateTransfers(transferDetails: Transfer): void {
    this.transfers.push(transferDetails);
    this.transfersSubject.next(this.transfers);
  }

  getAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }
  getTransfers(): Observable<Transfer[]> {
    return this.transfersSubject.asObservable();
  }

  getLatestTransfers(): Observable<Transfer[]> {
    return this.transfersSubject
      .asObservable()
      .pipe(map((transfers) => transfers.slice(-5).reverse()));
  }

  transferFunds(transferDetails: Transfer): Observable<boolean> {
    const fromAccount = this.accounts.find(
      (acc) => acc.accountNumber === transferDetails.fromAccount
    );
    const toAccount = this.accounts.find(
      (acc) => acc.accountNumber === transferDetails.toAccount
    );

    if (!fromAccount || !toAccount) {
      return throwError(() => new Error('Account not found'));
    }

    const amount = transferDetails.amount;

    if (amount <= 0) {
      return throwError(
        () => new Error('Transfer amount must be greater than zero')
      );
    }

    if (fromAccount.balance < amount) {
      return throwError(() => new Error('Insufficient balance'));
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.accountsSubject.next(this.accounts);
    this.updateTransfers(transferDetails);

    return new BehaviorSubject<boolean>(true).asObservable();
  }
}
