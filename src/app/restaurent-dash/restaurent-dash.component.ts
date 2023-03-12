import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData();
  allRestaurentData!: any;
  onAddMethod = false;
  onUpdateMethod = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    });
    this.getData();
  }

  // Button view : add or update
  clickAddResto(){
    this.formValue.reset();
    this.onAddMethod = true;
    this.onUpdateMethod = false;
  }

  // Now subscribe data

  addRestaurent() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    // passing value
    this.api.postRestaurent(this.restaurentModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurent Records added successfull 00 ');
        this.formValue.reset();
        this.getData();
      },
      (err) => {
        console.log(err);
        alert('Something went wrong !');
      }
    );
  }

  // Get data from server
  getData() {
    this.api.getRestaurent().subscribe((res) => {
      this.allRestaurentData = res;
      console.log('Data get successfull');
    });
  }

  // delete Data from server
  deleteData(data: any) {
    this.api.deleteRestaurent(data.id).subscribe((res) => {
      alert('Data Deleted Succefull !');
      this.getData();
    });
  }

  // Edit Data
  onEdit(data: any) {
    this.onAddMethod = false;
    this.onUpdateMethod = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  // Update Data
  updateRestaurent() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    this.api
      .updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id)
      .subscribe((res) => {
        alert('Restaurent Updated Successfull ');
        this.getData();
        this.formValue.reset();
      });
  }
}
