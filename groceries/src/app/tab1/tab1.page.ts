import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { GroceriesServiceService } from '.././groceries-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery List";

  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService) {};

  loadItems(){
    return this.dataService.getItems();
  };

  async editItem(item, index) {
    console.log("Editing Item - ", item, index);

    const toast = await this.toastController.create({
      message: 'Editing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    this.showEditItemPrompt(item, index);
  };

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);

    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index);
  };

  async addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  };

  async showAddItemPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      message: "Please enter item:",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            this.dataService.addItem(item);
          }
        }
      ]
    });

    await alert.present();
  };

  async showEditItemPrompt(item, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      message: "Please edit item:",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: '0',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: item => {
            console.log('Confirm Save', item);
            this.dataService.editItem(item, index);
          }
        }
      ]
    });

    await alert.present();
  };
}
