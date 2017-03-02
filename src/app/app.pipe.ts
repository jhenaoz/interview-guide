import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Pipe({ name: 'arrayify'})
export class ArrayifyPipe {
  transform(val) {
    return Array.isArray(val)
          ? val : [ val ];
  }
}