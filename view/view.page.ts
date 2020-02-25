import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(public nav: NavController, public route: ActivatedRoute) { }

  key;
  bID;
  view = []
  vship = {}

  ngOnInit() {
    this.bID = this.route.snapshot.paramMap.get("bID")
    this.key = this.route.snapshot.paramMap.get("key")

    firebase.database().ref("Shipment/" + this.key + "/inventory/" + this.bID).on('value', data => {
      if (data.val()) {
        this.view=[];
        this.vship = data.val()
        for(let key in this.vship){
          let obj=this.vship[key];
          obj.key=key
          console.log(this.vship[key])
          this.view.push(obj)
        }console.log(this.vship)

      }
    })
    console.log(this.key)
    console.log(this.bID)
  }

  back() {
    this.nav.navigateBack("tabs/tab1")
  }

}