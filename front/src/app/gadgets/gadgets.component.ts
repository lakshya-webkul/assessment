import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.css'],
  imports: [CommonModule]
})
export class GadgetsComponent implements OnInit {
  gadgets: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private apiService: ApiService, private router: Router) { }

  async ngOnInit() {
    const isAuthenticated = await this.apiService.checkAuth();
    if (!isAuthenticated) {
      this.router.navigate(['']);
      return;
    }
    this.loadGadgets();
  }

  async loadGadgets() {
    this.gadgets = await this.apiService.getGadgets(this.currentPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadGadgets();
    }
  }

  async logout() {
    await this.apiService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
