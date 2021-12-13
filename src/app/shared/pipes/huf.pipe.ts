import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'HufPipe' })
export class HufPipe implements PipeTransform {
  transform(value: number): string {
    return `${String(value)
      .split('')
      .reverse()
      .map((char, i) => (i % 3 === 0 ? `${char} ` : char))
      .reverse()
      .join('')} Ft`;
  }
}
