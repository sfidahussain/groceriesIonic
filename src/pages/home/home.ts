import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GrocerieServiceProvider } from '../../providers/grocerie-service/grocerie-service';
import { InputDialogueServiceProvider } from '../../providers/input-dialogue-service/input-dialogue-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  constructor(public navCtrl: NavController, public ToastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GrocerieServiceProvider, public inputDialogueService: InputDialogueServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing item - ", item, index);
    const toast = this.ToastCtrl.create({
      message: "Removing item - " + item.name + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  shareItem(item, index) {
    console.log("Sharing item - ", item, index);
    const toast = this.ToastCtrl.create({
      message: "Sharing item - " + item.name + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App";

    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared successfully.");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });
  }

  editItem(item, index) {
    console.log("Edit item - ", item, index);
    this.inputDialogueService.showPrompt(item, index);
  }

  addItem() {
    console.log("Adding item");
    this.inputDialogueService.showPrompt();
  }
}
