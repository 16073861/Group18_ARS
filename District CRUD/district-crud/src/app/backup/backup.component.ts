import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Alert, AlertService } from '../_alert';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  options = { autoClose: true }

  constructor(private dataService: GlobalService, private alert: AlertService) { }

  ngOnInit(): void {
  }

  backup() {
    this.dataService.backupdb().subscribe(res => {
      console.log('Backup created!')}) 
    this.alert.success('Backup successfully created @ C:\\backup.bak')
  }

  restore() {
    this.dataService.restoredb().subscribe((event: boolean) => {  
      if ((event)) {
        this.alert.success('Backup successfully restored!!')
      } else{
        this.alert.error('Backup failed!! No existing backups!!')
      }}) 
  }

}
