import { AccountType } from '@enums/account-type.enum';

export interface Account {
  accountName: string;
  accountNumber: string;
  accountType: AccountType;
  depositAmount?: number;
  balance: number;
  dateCreated: Date;
  dateUpdated: Date;
}
