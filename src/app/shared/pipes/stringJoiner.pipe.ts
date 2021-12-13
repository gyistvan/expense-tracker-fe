import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringJoiner' })
export class stringJoinerPipe implements PipeTransform {
  transform(arr: string[], separator: string = ', '): string {
    return arr.join(separator);
  }
}
