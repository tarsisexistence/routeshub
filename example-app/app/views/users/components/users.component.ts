import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <nav>
      <a
        *ngFor="let user of users"
        [navLink]="[user]"
        [routerLinkActive]="['router-link-active']"
        >{{ user }}</a
      >
    </nav>
    <p>
      Users Text
    </p>
  `
})
export class UsersComponent implements OnInit {
  public users: string[];

  public ngOnInit(): void {
    this.users = [
      'Ada Lovelace',
      'Niklaus Wirth',
      'Donald Knuth',
      'Bjarne Stroustrup',
      'Edsger W. Dijkstra',
      'Alan Turing',
      'Anders Hejlsberg'
    ];
  }
}
