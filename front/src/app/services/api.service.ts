import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private API_URL = 'http://localhost:5000';

    constructor() { }

    async login(email: string, password: string): Promise<any> {
        console.log(email, password);

        const response = await axios.post(`${this.API_URL}/auth/login`, { email, password }, { withCredentials: true });
        return response.data;
    }

    async checkAuth(): Promise<boolean> {
        const response = await axios.get(`${this.API_URL}/auth/check-auth`, { withCredentials: true });
        return response.data.authenticated;
    }

    async logout(): Promise<any> {
        const response = await axios.post(`${this.API_URL}/auth/logout`, {}, { withCredentials: true });
        return response.data;
    }

    async getGadgets(page: number, limit: number = 5): Promise<any[]> {
        const response = await axios.get(`${this.API_URL}/gadgets?page=${page}&limit=${limit}`, { withCredentials: true });
        return response.data;
    }

    async saveGadget(gadget: any): Promise<any[]> {
        const response = await axios.post(`${this.API_URL}/gadgets`, gadget, { withCredentials: true });
        return response.data;
    }

    async updateGadget(gadget: any): Promise<any[]> {
        const response = await axios.put(`${this.API_URL}/gadgets/${gadget.id}`, gadget, { withCredentials: true });
        return response.data;
    }


    async deleteGadget(id: number = 0): Promise<any[]> {
        const response = await axios.delete(`${this.API_URL}/gadgets/${id}`, { withCredentials: true });
        return response.data;
    }

    async bulkDeleteGadgets(ids: number[]) {
        const response = await axios.post(`${this.API_URL}/gadgets/bulk-delete`, ids, { withCredentials: true });
        return response.data;
    }
}
