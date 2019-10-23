import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';

const Material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule {
}
