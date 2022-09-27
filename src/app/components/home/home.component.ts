import { Component, OnInit, ApplicationRef, NgZone, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { Deferred } from 'ts-deferred';

import { environment } from '../../../environments/environment';

import { FormularioAT } from '../../shared/pages/formularioAT';

import { IStatistics } from '../../shared/models/fisics/IStatistics';
import { MasterLogic } from '../../shared/models/logics/MasterLogic';


import { MasterService } from '../../shared/services/master.service';
import { MaestroFLujoEtapa } from '../../shared/models/fisics/MaestroFLujoEtapa';
import { MaestroMaterialService } from '../../shared/services/maestromaterial.service';
import { MaestroMaterialFilter } from 'src/app/shared/models/fisics/MaestroMaterialFilter';
import { PagedItemCollection, Item } from '@pnp/sp/items';
import { MaestroMaterial } from '../../shared/models/fisics/MaestroMaterial';
import { Variables } from '../../shared/variables';
import { Funciones } from '../../shared/funciones';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { FormControl } from '@angular/forms';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends FormularioAT implements OnInit {
  esMiembroId: boolean;
  currentUserName: string = '';
  currentUserPictureUrl = '';
  currentUserEmail = '';
  statistics: IStatistics;
  solicitudesEnProceso: number;
  solicitudesEnPendientes: number;
  solicitudesCerradas: number;
  solicitudesVencidas: number;
  nuevaSolicitud: boolean;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    // plugins: {
    //   datalabels: {
    //     formatter: (value, ctx) => {
    //       const label = ctx.chart.data.labels[ctx.dataIndex];
    //       console.log(value);
    //       console.log(label);
    //       return label.toString().replace(value, '').trim();
    //     },
    //   },
    // }
  };
  pieChartPlugins = [/*pluginDataLabels*/];

  pieChartLabel: Label[];
  pieChartData: SingleDataSet;
  pieChartColors: Color[] = [
    {
      backgroundColor: [/*Variables.colores.Flujo.Creadas, */Variables.colores.Flujo.EnProceso, Variables.colores.Flujo.Cerradas],
      hoverBackgroundColor: [/*Variables.colores.Flujo.Creadas, */Variables.colores.Flujo.EnProceso, Variables.colores.Flujo.Cerradas],
    }
  ];

  barChartLabels: Label[];
  barChartLabelsPorMes: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[];
  barChartDataPorMes: ChartDataSets[];

  maestroMaterial: MaestroMaterial[];
  formControlAnnio: FormControl;
  anniosSelect: number[];

  screenWidth: any;

  constructor(
    public applicationRef: ApplicationRef,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public masterService: MasterService,
    public zone: NgZone,
    public _spinner: SpinnerVisibilityService,
    private maestroMaterialService: MaestroMaterialService
  ) {
    super('Home', applicationRef, dialog, route, router, masterService, zone, _spinner);

    this.esMiembroId = false;

    this.formControlAnnio = new FormControl(0);
   
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    this.cargarDatosPagina();
  }

  cargarDatosPagina() {
    this.mostrarProgreso();
    this.statistics = <IStatistics>{};
    this.obtenerMaestrosYDatos().then(
      () => {
        // console.log('log');

        this.currentUserName = this.datosMaestros.currentUser.Title;
        this.currentUserPictureUrl = "assets/img/faces/userprofile.png"; //this.datosMaestros.currentUser.PictureUrl;
        this.currentUserEmail = this.datosMaestros.currentUser.Email;

        this.ocultarProgreso();
      },
      err => this.guardarLog(err)
    );
  }



 

  obtenerMaestrosYDatos(): Promise<boolean> {
    //debugger;
    const d: Deferred<boolean> = new Deferred<boolean>();

    this.masterService
      .getDatosMaestros()
      .subscribe((masterLogic: MasterLogic) => {
        if (masterLogic.isDatos) {
          this.datosMaestros = masterLogic;
          d.resolve(true);
        }
      });

    return d.promise;
  }

  public irPaginaExterna(
    nombrePagina: string,
    parametroQueryString: string,
    valorQueryString: string
  ) {
    const url =
      // environment.getRutaBaseApp() +
      nombrePagina;// +
    //'?' +
    //parametroQueryString +
    //'=' +
    //valorQueryString;

    //window.open(url, '_blank');
    this.router.navigate([url])
  }

}
