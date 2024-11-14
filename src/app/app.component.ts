import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf, NgClass],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Tropical Heven';
  showFullLayout = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();

    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.showFullLayout = !(currentUrl === '/login' || currentUrl === '/register' || currentUrl.includes('/admin'));
    });
  }
}
