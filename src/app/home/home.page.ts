import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Tarea } from '../tarea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tareaEditando: Tarea; 
  constructor(private router: Router ,private firestoreService: FirestoreService) {
    // Crear una tarea vacía
    this.tareaEditando = {} as Tarea;
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("tareas", this.tareaEditando).then(() => {
      console.log('Tarea creada correctamente!');
      this.tareaEditando= {} as Tarea;
      //aqui
      this.obtenerListaTareas();
    }, (error) => {
      console.error(error);
    });
  }
/////////////
document: any = {
  id: "",
  data: {} as Tarea
};
/////////

  ///////////////////////

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];

  obtenerListaTareas(){
    this.firestoreService.consultar("tareas").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });

  }
  //////////
  idTareaSelec: string;

  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.titulo = tareaSelec.data.titulo;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
    //
    //this.router.navigate(['/detalles']);
    //
    this.router.navigate(['/detalle', this.idTareaSelec]);
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idTareaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }
  //////
  clicBotonModificar() {
    this.firestoreService.actualizar("tareas", this.idTareaSelec, this.tareaEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }
  
  
}
