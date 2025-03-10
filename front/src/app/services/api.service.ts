import { Injectable } from '@angular/core';
import axios from 'axios';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:5000'; // Backend URL

  constructor() {}

  // Admin Login
  async login(email: string, password: string): Promise<any> {
    console.log(email, password);

    const response = await axios.post(`${this.API_URL}/auth/login`, { email, password }, { withCredentials: true });
    return response.data;
  }

  // Check if Admin is Authenticated
  async checkAuth(): Promise<boolean> {
    const response = await axios.get(`${this.API_URL}/auth/check-auth`, { withCredentials: true });
    return response.data.authenticated;
  }

  // Logout Admin
  async logout(): Promise<any> {
    const response = await axios.post(`${this.API_URL}/auth/logout`, {}, { withCredentials: true });
    return response.data;
  }

  // Get Gadgets (Protected Route)
  async getGadgets(page: number, limit: number = 5): Promise<any[]> {
    const response = await axios.get(`${this.API_URL}/gadgets?page=${page}&limit=${limit}`, { withCredentials: true });
    return response.data;
  }
}
