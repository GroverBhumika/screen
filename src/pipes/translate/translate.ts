import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';


/**
 * Generated class for the TranslatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslateService) {
    translationService.setDefaultLang('en');
  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
  switchLanguage(language: string) {
    this.translationService.use(language);
  }
}
