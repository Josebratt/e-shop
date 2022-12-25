import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];
  endsubs$: Subject<unknown> = new Subject();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.userService.getUsers()
    .pipe(takeUntil(this.endsubs$))
    .subscribe({
      next: (users) => {
        this.users = users;
        setTimeout(() => {
          $('#table').DataTable({
            retrieve: true,
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
            dom: 'Bfrtip'              
          });
        }, 1);
      },
      error: (error) => console.error(error)
    });
  }

  onUpdate(id: string) {
    this.router.navigateByUrl(`/admin/user/add/${id}`);
  }

}
