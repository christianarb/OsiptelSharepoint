import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Variables } from './shared/variables';
import { HomeComponent } from './components/home/home.component';
/*import { BandejaSolicitudComponent } from './components/bandeja-solicitud/bandeja-solicitud.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { BandejaParametrosComponent } from './components/mantenimiento/bandeja-parametros/bandeja-parametros.component';
import { FormularioParametrosComponent } from './components/mantenimiento/formulario-parametros/formulario-parametros.component';
import { BandejaEtapasComponent } from './components/mantenimiento/bandeja-etapas/bandeja-etapas.component';
import { FormularioEtapasComponent } from './components/mantenimiento/formulario-etapas/formulario-etapas.component';
*/
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'  },
  {
    path: Variables.path.home,
    component: HomeComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  }/*,
  {
    path: Variables.path.bandejaSolicitudMaterial,
    component: BandejaSolicitudComponent,
    //loadChildren: () => import('./components/bandeja-solicitud/bandeja-solicitud.component').then(m => m.BandejaSolicitudComponent)
  },
  {
    path: Variables.path.formSolicitudMaterial,
    component: FormularioSolicitudComponent,
    //loadChildren: () => import('./components/formulario-solicitud/formulario-solicitud.component').then(m => m.FormularioSolicitudComponent)
  },*/
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
