import { Component, OnInit } from '@angular/core';
import { User } from '@models/user-details.model';

@Component({
  selector: 'app-top-nav',
  standalone: false,
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  isMenuOpen: boolean = false;
  userDetails: User = {
    firstName: 'Harshitha',
    lastName: 'Kosuru',
  };
  avatar!: string;

  ngOnInit(): void {
    if (this.userDetails) {
      this.avatar =
        this.userDetails.firstName?.[0].toUpperCase() +
        this.userDetails.lastName?.[0].toUpperCase();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
