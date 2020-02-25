import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public nav:NavController,  public loadingController:LoadingController) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((login)=>{
      if(login){
        firebase.database().ref('Branch/'+firebase.auth().currentUser.uid).once('value',data=>{
          if(data.val()){
            this.nav.navigateRoot("tabs")
          }else{
            firebase.auth().signOut();
          }
        })
      }
      
    })
  }

  Branch={}
  loading=false

  In(){
    this.loading = true
    firebase.auth().signInWithEmailAndPassword(this.Branch["bID"], this.Branch["pass"]).then(()=>{
      firebase.database().ref('Branch/'+firebase.auth().currentUser.uid).once('value',data=>{
        if(data.val()){
          this.nav.navigateRoot("tabs")
        }else{
          firebase.auth().signOut();
        }
      })
      
      this.loading = false
    }).catch((e)=>{
        alert(e)
        this.loading = false
      })
  }

}
