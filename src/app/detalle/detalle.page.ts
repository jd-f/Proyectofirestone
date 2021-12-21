import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from '../tarea';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  id: String= ""
  constructor(private router: Router,private activateRouter: ActivatedRoute,private firestoreService: FirestoreService) { }

  ngOnInit() {
   this.id = this.activateRouter.snapshot.paramMap.get('id')
   this.firestoreService.consultarPorId("tareas", this.id).subscribe((resultado) => {
    // Preguntar si se hay encontrado un document con ese ID
    if(resultado.payload.data() != null) {
      this.document.id = resultado.payload.id
      this.document.data = resultado.payload.data();
      // Como ejemplo, mostrar el título de la tarea en consola
      console.log(this.document.data.titulo);
    } else {
      // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
      this.document.data = {} as Tarea;
    } 
  });
  }
  document: any = {
    id: "",
    data: {} as Tarea
  };

  clicBotonModificar() {
    this.firestoreService.actualizar("tareas",this.document.id, this.document.data).then(() => {
    })
    this.router.navigate(['/home']);
  }
  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.document.id).then(() => {
    })
    this.router.navigate(['/home']);
  }
}
