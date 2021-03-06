﻿import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public livesCount: string;

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getLivesCount().subscribe(result => {
            this.livesCount = result;
        });
    }

    public onLiveClicked() {
        console.log('Click by live event');
    }
}