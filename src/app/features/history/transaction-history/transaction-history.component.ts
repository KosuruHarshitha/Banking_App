import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Transfer } from '@models/transfer-details.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  @Input() alltransfers: Transfer[] | null = [];

  subscriptions: Subscription = new Subscription();
  filteredTransfers: Transfer[] = [];
  searchText: FormControl = new FormControl('');
  accountTypes: string[] = [];

  totalTransactions = 0;
  pageSize = 5;
  currentPage = 1;
  placeholderRows: Transfer[] = [];

  ngOnInit(): void {
    this.filteredTransfers = this.alltransfers || [];
    this.updateTable();

    this.subscriptions.add(
      this.searchText.valueChanges.subscribe((value: string) => {
        this.applyFilter(value || '');
      })
    );
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTable();
    }
  }

  onNext() {
    if (this.currentPage * this.pageSize < this.totalTransactions) {
      this.currentPage++;
      this.updateTable();
    }
  }

  private applyFilter(searchText: string) {
    const lowerSearch = searchText.toLowerCase();

    if (!lowerSearch || !this.alltransfers) {
      this.filteredTransfers = this.alltransfers || [];
    } else {
      this.filteredTransfers = this.alltransfers.filter((transfer) => {
        return Object.values(transfer).some((val) =>
          String(val).toLowerCase().includes(lowerSearch)
        );
      });
    }

    this.currentPage = 1;
    this.updateTable();
  }

  private updateTable() {
    this.totalTransactions = this.filteredTransfers.length;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.placeholderRows = this.filteredTransfers.slice(start, end);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
