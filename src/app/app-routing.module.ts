import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'transfers',
    loadChildren: () =>
      import('./features/transfer/transfer.module').then(
        (m) => m.TransferModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./features/history/history.module').then((m) => m.HistoryModule),
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: '**', redirectTo: 'accounts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
