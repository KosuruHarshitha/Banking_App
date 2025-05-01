import { Component } from '@angular/core';
import { Account } from '@models/account.model';
import { Transfer } from '@models/transfer-details.model';
import { AccountService } from '@services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  transfers$: Observable<Transfer[]>;

  constructor(private accountService: AccountService) {
    this.transfers$ = this.accountService.getTransfers();
  }
}
