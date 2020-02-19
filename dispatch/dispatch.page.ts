import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { element } from 'protractor';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.read()
   // this.getShip()
    //this.getB()
  }

  select(i){
    for(let b=0;b<this.branch.length;b++){
      if(i==b){
        this.branch[b].select=true;
      }else{
        this.branch[b].select=false;
      }
    }
  }

  branch = []
  allB = {}
  read() {
    firebase.database().ref("Branch/").on("value", data => {
      this.branch = [];
      this.allB = data.val()
      for (let key in this.allB) {
        let obj = this.allB[key];
        obj.key = key
        obj.select = false
        console.log(this.allB[key])
        this.branch.push(obj)
      }
      console.log(this.allB)
    })
  }

  // getB() {
  //   firebase.database().ref("Branch/" + firebase.auth().currentUser.uid).on("value", data => {
  //     this.branch = [];
  //     this.allB = data.val()
  //     for (let key in this.allB) {
  //       let obj = this.allB[key];
  //       obj.key = key
  //       console.log(this.allB[key])
  //       this.branch.push(obj)
  //     }
  //     console.log(this.allB)
  //   })
  // }

  shipment = []
  allS = {}
  getShip(branchid) {
    firebase.database().ref("Shipment/").once("value", data => {
      this.shipment = [];

      for (const key in data.val()) {
        let ok = false;
        let holder = [];
        for (const key2 in data.val()[key].inventory[branchid]) {
          let products = data.val()[key].inventory[branchid];
          if(parseInt(products[key2].qty)>0){
            ok = true;
            holder.push(products[key2])
          }
        }

        if(ok == true){

          this.shipment.push({
            shipID:data.val()[key].shipID,
            From:data.val()[key].From,
            OrderDate:data.val()[key].OrderDate,
            Received:data.val()[key].Received,
            inventory:holder,
          })
        
        }

      }

      console.log(this.shipment);

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

}
