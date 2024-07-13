import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    const token: string | null = this.authService.getToken();
    if (token == null) {
      console.log(token)
      this.router.navigateByUrl('/');
    } else {
      const userRole = this.authService.getUserRole();
      if (userRole === 'ADMIN') {
       this.router.navigateByUrl('/dashboard');
      } else if (userRole === 'USER') {
        this.router.navigateByUrl('/playground');
      }
    }
  }
}
