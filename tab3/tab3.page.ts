import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public nav: NavController) { }

  ngOnInit() {
    this.readB()
  }

  branch = []
  readB() {
    firebase.database().ref("Branch/" + firebase.auth().currentUser.uid).on("value", data => {
        this.branch = data.val()
        console.log(this.branch)
    })
  }

  out() {
    firebase.auth().signOut().then(() => {
      this.nav.navigateRoot("login")
    })
  }
}
