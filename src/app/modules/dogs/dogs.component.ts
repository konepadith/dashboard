import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../shared/components/dialog-box/dialog-box.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'dob', 'gender','action'];
  data:any=[]
  dataSource : any;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  myFiles:any
  addDogs:any = FormGroup
  selection = new SelectionModel<Element>(true, []);
  constructor(private service : DashboardService,
              private fb:FormBuilder,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog) {



  }

  ngOnInit(): void {
    this.addDogs=this.fb.group({
      dog_name:       [null,Validators.required],
      dog_dob:        [null,Validators.required],
      dog_gender:     [null,Validators.required],
      dog_species:    [null,Validators.required],
      images:         [null,Validators.required],
    })

    this.service.dogs_data().subscribe(response=>{
      this.data=response.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      })

  }

  get d() { return this.addDogs.controls; }


  public ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  dog_gender(status:any){
    let semantic
    switch (status) {
      case 0:
        semantic='Girl'
          break;
      case 1:
        semantic='Boy'
          break;
    }
    return semantic
  }

  uploadno1(event:any){
    this.myFiles = event.target.files
  }

  adddogs(){
    const data= new FormData(); //Create Data Store by FormData()
    Object.entries(this.addDogs.value).forEach(([key,value]:any[])=>{
      data.set(key,value)
    })
    for (let index = 0; index < this.myFiles.length; index++) {
      const element = this.myFiles[index];
      data.append('images',element)
    }

    console.log(data)
    this.service.add_dog_data_array(data).subscribe(response=>{
      console.log(response)

      this.service.dogs_data().subscribe(response=>{
        this.data=response.data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        })
    })

  }
  // openDialog(action:any,obj:any) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '250px',
  //     data:obj
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result.event == 'Add'){
  //       this.addRowData(result.data);
  //     }else if(result.event == 'Update'){
  //       this.updateRowData(result.data);
  //     }else if(result.event == 'Delete'){
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }
  // addRowData(row_obj:any){
  //   var d = new Date();
  //   this.dataSource.push({
  //     id:d.getTime(),
  //     name:row_obj.name
  //   });
  //   this.table.renderRows();

  // }
  // updateRowData(row_obj:any){
  //   this.dataSource = this.dataSource.data.filter((value:any,key:any)=>{
  //     if(value.dog_id == row_obj.dog_id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj:any){
  //   this.dataSource = this.dataSource.data.filter((value:any,key:any)=>{

  //     return value.dog_id != row_obj.dog_id ;
  //   });
  // }
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach((row: Element) => this.selection.select(row));
  // }
  // removeSelectedRows() {

  //   this.selection.selected.forEach(item => {
  //     let index: number = this.data.findIndex((d: Element) => d === item);
  //     console.log(this.data.findIndex((d: Element) => d === item));
  //     this.data.splice(index,1)
  //     this.dataSource = new MatTableDataSource<Element>(this.data);
  //   });
  //   this.selection = new SelectionModel<Element>(true, []);
  // }

  Edit(event:any){
    console.log(event.dog_id)

  }
  Delete(event:any){
    let data={'dog_id':event.dog_id}
    this.service.delete_dog_data(data).subscribe(response=>{
      console.log(response)
      this.service.dogs_data().subscribe(response=>{
        this.data=response.data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        })
    })
  }
}
