import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  imageUpload(event: any) {
    const file = event.target.files.length;
    return new Promise((resolve) => {
      for (let i = 0; i < file; i++) {
        const reader = new FileReader();
        reader.onload = (data: any) => {
          resolve(data.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    });
  }

  dateFormat(date: Date){
    var Date =String(date.getDate()).padStart(2,'0')
    return `${Date}/${date.getMonth()+1}/${date.getFullYear()}`;
  }
}
