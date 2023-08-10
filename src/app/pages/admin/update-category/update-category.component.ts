import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
constructor(private _cat:CategoryService,
  private _route:ActivatedRoute){}
  cid:any
  categories:any
ngOnInit():void{
  this.cid=this._route.snapshot.params["cid"]

  this._cat.getCat(this.cid).subscribe((data:any)=>{
    this.categories=data
    console.log(this.categories)
  },(error)=>{
    console.log("error from update-category.ts"+error)
  })
}
  updateData(){
    this._cat.updateCategory(this.categories).subscribe((data:any)=>{
      Swal.fire('Success !!', 'Category updated', 'success')
    },
    (error)=>{
      Swal.fire('Error', 'error in updating category', 'error');
    })
  }
}
