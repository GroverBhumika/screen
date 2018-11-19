import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchTextPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchText',
})
export class SearchTextPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], searchText: string) {
    // console.log(items);
    // console.log(searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      console.log(it);
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
