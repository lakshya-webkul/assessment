import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-gadgets',
    templateUrl: './gadgets.component.html',
    styleUrls: ['./gadgets.component.css'],
    imports: [CommonModule, FormsModule]
})

export class GadgetsComponent implements OnInit {
    gadgets: any[] = [];
    gadget: any = {
        id: 0,
        name: '',
        description: '',
    };
    currentPage: number = 1;
    totalPages: number = 1;
    errorMessage: any = {
        name: '',
        description: '',
    };
    selectedGadgets: number[] = [];

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
        let result: any = await this.apiService.getGadgets(this.currentPage);
        this.gadgets = result.gadgets;
        this.totalPages = result.totalPages;
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadGadgets();
        }
    }

    resetGadgetObj() {
        this.gadget = {
            id: 0,
            name: '',
            description: '',
        };
    }

    async deleteGadget(gadget: any) {
        if (confirm("Are you sure")) {
            let result: any = await this.apiService.deleteGadget(gadget.id);
            if (result.status) {
                this.loadGadgets();
                alert(result.message);
            }
        }
    }

    async saveGadget() {
        if (this.gadget.name == '' && this.gadget.name.length == 0) {
            this.errorMessage.name = "Gadget name is required!"
        } else {
            this.errorMessage.name = ""
        }
        if (this.gadget.description == '' && this.gadget.description.length == 0) {
            this.errorMessage.description = "Gadget description is required!"
        } else {
            this.errorMessage.descriptio = ""
        }

        if (this.errorMessage.name == '' && this.errorMessage.description == '') {
            if (this.gadget.id) {
                let result: any = await this.apiService.updateGadget(this.gadget);
                if (result.status) {
                    document.getElementById('gadgetModal')?.click();
                    this.loadGadgets();
                    alert(result.message);
                }
            } else {
                let result: any = await this.apiService.saveGadget(this.gadget);
                if (result.status) {
                    document.getElementById('gadgetModal')?.click();
                    this.loadGadgets();
                    alert(result.message);
                }
            }

        }
    }

    openGadgetDetail(gadget: any) {
        document.getElementById('addGadgetBtn')?.click();
        this.gadget = gadget;
    }

    async logout() {
        await this.apiService.logout();
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }

    updateSelection(gadget: any) {
        if (gadget.selected) {
            this.selectedGadgets.push(gadget.id);
        } else {
            this.selectedGadgets = this.selectedGadgets.filter(id => id !== gadget.id);
        }
    }

    toggleSelectAll(event: any) {
        const checked = event.target.checked;
        this.gadgets.forEach(gadget => {
            gadget.selected = checked;
            if (checked) {
                if (!this.selectedGadgets.includes(gadget.id)) {
                    this.selectedGadgets.push(gadget.id);
                }
            } else {
                this.selectedGadgets = [];
            }
        });
    }

    async deleteSelected() {
        let result: any = await this.apiService.bulkDeleteGadgets(this.selectedGadgets);
        if (result.status) {
            alert(result.message);
            if (this.gadgets.length == this.selectedGadgets.length) {
                this.currentPage = 1;
            }
            this.loadGadgets();
        }
    }

}
