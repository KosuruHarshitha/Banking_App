import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './components/top-nav/top-nav.component';

@NgModule({
  declarations: [TopNavComponent, ButtonComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [
    TopNavComponent,
    ButtonComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
