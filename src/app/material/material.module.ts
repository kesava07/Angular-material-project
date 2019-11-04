import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';

const Material = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule {
}
