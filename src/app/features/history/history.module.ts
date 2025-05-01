import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material/material.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [HistoryComponent, TransactionHistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class HistoryModule {}
