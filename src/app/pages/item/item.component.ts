import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
  cargando:boolean=true;
  producto:any;
  id:string='';

  constructor(private route:ActivatedRoute, public productoService: ProductosService){}


  ngOnInit(): void {
    this.route.params.subscribe(parametros=>{
      
      this.productoService.getProducto (parametros['id']).subscribe((resp)=>{
        this.id=parametros['id'];
        this.producto=resp;
        this.cargando=false;
      })
    })
    
  }

}
