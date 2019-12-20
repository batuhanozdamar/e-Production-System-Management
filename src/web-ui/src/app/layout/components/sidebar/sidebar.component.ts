import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    constructor() {}
     currentUser = null;

    ngOnInit() {
        this.showMenu = '';
        var currentUserStr = localStorage.getItem("currentUser");

        if (currentUserStr != null && currentUserStr != "") {
            this.currentUser= JSON.parse(currentUserStr);

        }


    }



    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
