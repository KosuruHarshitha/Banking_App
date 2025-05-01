import { Component, Input, OnInit } from '@angular/core';
import { Transfer } from '@models/transfer-details.model';

@Component({
  selector: 'app-transfer-list',
  standalone: false,
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent implements OnInit {
  @Input() latestTransfers: Transfer[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
