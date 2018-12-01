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
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public dataService: GrocerieServiceProvider,  public inputDialogService: InputDialogueServiceProvider, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad(){
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  removeItem(id) {
    this.dataService.removeItem(id);
  }

  shareItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Sharing Item -  " + index + "...",
      duration: 3000
    });

    toast.present();

    let message = 'Grocery Item - Name: ' + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      
    }).catch((error) => {
      console.log("Error while sharing ", error)
    });
  }


  addItem(){
    this.inputDialogService.showPrompt();
  }

  editItem(item, index){
    console.log("Edit Item - ", item, index)
    const toast = this.toastCtrl.create({
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);

  }

}
