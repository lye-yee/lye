import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public nav: NavController) { }


  userinfo = {bID:""};
  ngOnInit() {
    firebase.database().ref('Branch/' + firebase.auth().currentUser.uid).once('value', data => {
      this.userinfo = data.val();
    })
    this.read()
  }

  title = ""
  ionViewWillEnter() {
    this.title = 'All'
  }

  ship = []
  allS = {}
  // count = 0
  qty = {}
  read() {
    firebase.database().ref("Shipment/").on("value", data => {
      this.ship = [];
      this.allS = data.val()
      for (let key in this.allS) {
        let obj = this.allS[key];
        obj.key = key
        obj.select = false
        console.log(this.allS[key])
        console.log(this.userinfo['bID']);
        obj.count = 0;
        for (const key2 in obj.inventory[this.userinfo['bID']]) {

          obj.count += parseInt(obj.inventory[this.userinfo['bID']][key2].carton);
        }
        this.ship.push(obj)
      }
      console.log(this.allS)
    })
  }

  keyword = "";

  sorting(array) {
    let holder = [];

    array.forEach(element => {
      if ((element.shipID).includes(this.keyword)) {
        holder.push(element);
      }
    });

    return holder;
  }

  shipment = []
  getShip(branchid) {
    firebase.database().ref("Shipment/").once("value", data => {
      this.shipment = [];

      for (const key in data.val()) {
        let ok = false;
        let holder = [];
        for (const key2 in data.val()[key].inventory[branchid]) {
          let products = data.val()[key].inventory[branchid];
          if (parseInt(products[key2].qty) > 0) {
            ok = true;
            holder.push(products[key2])
          }
        }

        if (ok == true) {

          this.shipment.push({
            shipID: data.val()[key].shipID,
            ETA: data.val()[key].ETA,
            OrderDate: data.val()[key].OrderDate,
            DueDate: data.val()[key].DueDate,
            inventory: holder,
          })

        }

      }

      console.log(this.shipment);
    })
  }

  view(s) {
    this.nav.navigateForward("view/" + s.key + "/" + this.userinfo.bID)
    console.log(s)
  }

}
