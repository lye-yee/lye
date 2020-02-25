import { Component, OnInit, HostListener } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

 
  constructor(public storage:Storage) { }

  scan=""
  arrayer=[];
  onScan=false;

  ngOnInit() {
    this.storage.get('barcode').then((val) => {
      console.log('Barcode is', val);
    });
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(this.onScan)
    console.log(this.arrayer);
    if(this.onScan==true){
      if(event.key =='Enter'){
        console.log(this.scan.substring(0,this.scan.length-5));
        if(this.arrayer.some(e => e.name === this.scan) == false){
          this.arrayer.push({name:this.scan,qty:1})
          this.scan="";
          console.log(this.arrayer)
        }else{
          this.arrayer[this.arrayer.findIndex(e => e.name === this.scan)].qty+=1;
          this.scan="";
          console.log(this.arrayer)
        }
      }else{
        this.scan+=event.key;
      }
    }
  }

  on() {
    this.onScan=true;
  }

  off() {
    this.onScan=false;
  }

}
