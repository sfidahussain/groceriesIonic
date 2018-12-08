import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GrocerieServiceProvider } from '../../providers/grocerie-service/grocerie-service';


/*
  Generated class for the InputDialogueServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogueServiceProvider {

  constructor(public dataService: GrocerieServiceProvider, public alertCtrl: AlertController) {
    console.log('Hello InputDialogueServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    if(index !== undefined) {
      var id = item._id;
    }
  
    const prompt = this.alertCtrl.create({ 
      title: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item..." : "Please enter an item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked', data);
          }
        },
        {
          text: 'Save',
          handler: item => {
            if (index !== undefined) {
              this.dataService.editItem(item, id, index);
              console.log('Edit clicked', item);
            }
            else {
              this.dataService.addItem(item);
              console.log('Add clicked', item);
            }
            console.log('Saved clicked', item);
          }
        }
      ]
    });
    prompt.present();
  }

}

