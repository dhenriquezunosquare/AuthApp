import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  get usuario() {
    return this.service.usuario;
  }

  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {}

  LogOut(): void {
    this.service.logout();
    this.router.navigateByUrl('/auth');
  }
}
