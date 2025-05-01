import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material/material.module';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { TransferCreationComponent } from './transfer-creation/transfer-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { TransferListComponent } from './transfer-list/transfer-list.component';

@NgModule({
  declarations: [TransferComponent, TransferCreationComponent, TransferListComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TransferModule {}
