import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cDate' })
export class datePipe implements PipeTransform {
  transform(d: Date | string): string {
    if (typeof d === 'string') {
      d = new Date(d);
    }
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }
}
