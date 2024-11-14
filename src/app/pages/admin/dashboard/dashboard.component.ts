import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user) {
      let jsonUser = JSON.parse(user)

      this.usersName = jsonUser.name
      this.usersEmail = jsonUser.email

      this.userImg = `https://ui-avatars.com/api/?name=${jsonUser.name}&size=128&rounded=true&background=0D8ABC&color=fff`;
    }
  }

  constructor(private router:Router){}
  
  usersName = '';
  usersEmail = '';
  userImg = ''

  signOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }
}
