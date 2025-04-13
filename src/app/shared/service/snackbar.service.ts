import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  constructor(private matsnackbar: MatSnackBar) { }

  addSnackbar(msg: string) {
    this.matsnackbar.open(msg, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'left',
      duration: 3000
    })
  }
}
