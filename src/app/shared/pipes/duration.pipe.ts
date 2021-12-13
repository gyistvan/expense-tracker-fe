import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class timePipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let mins = Math.floor(value % 60);
    return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins} hour`;
  }
}
