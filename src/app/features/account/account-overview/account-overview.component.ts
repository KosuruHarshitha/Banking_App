import { Component, Input } from '@angular/core';
import { Account } from '@models/account.model';

@Component({
  selector: 'app-account-overview',
  standalone: false,
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
})
export class AccountOverviewComponent {
  @Input() accounts: Account[] | null = [];
}
