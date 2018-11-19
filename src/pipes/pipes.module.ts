import { NgModule } from '@angular/core';
import { SearchTextPipe } from './search-text/search-text';
import { TranslatePipe } from './translate/translate';
@NgModule({
	declarations: [SearchTextPipe,
    TranslatePipe],
	imports: [],
	exports: [SearchTextPipe,
    TranslatePipe]
})
export class PipesModule {}
