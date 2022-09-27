export const environment = {
  production: true,
  /*webRelativeUrl: '/sites/yanbalappsdesa/productosnuevos',
  proxyUrl: 'https://uniqueyanbal.sharepoint.com',
  cdnUrl: 'https://uniqueyanbal.sharepoint.com/sites/corporacion/cdn',
  paredUrl: 'https://uniqueyanbal.sharepoint.com/sites/yanbalappsdesa/productosnuevos/pared/',
*/
  // appPage: '/SitePages/app.aspx/',
  // cdnUrl: 'https://OSIPTEL.sharepoint.com/sites/Desarrollo',
  // paredUrl: 'https://OSIPTEL.sharepoint.com/sites/Desarrollo',
  // proxyTenant: 'https://OSIPTEL.sharepoint.com',
  // proxyUrl: 'https://OSIPTEL.sharepoint.com',
  // webRelativeUrl: '/sites/Desarrollo',
  // sitePared: 'pared',
  // urlForDownloadTest: 'https://OSIPTEL.sharepoint.com',

   appPage: '/SitePages/app.aspx/',
   cdnUrl: 'https://agpglass.sharepoint.com/sites/elysium20',
   paredUrl: 'https://agpglass.sharepoint.com/sites/elysium20',
   proxyTenant: 'https://agpglass.sharepoint.com',
   proxyUrl: 'https://agpglass.sharepoint.com',
   webRelativeUrl: '/sites/elysium20',
   sitePared: 'pared',
   urlForDownloadTest: 'https://agpglass.sharepoint.com',

  /*appPage: '/SitePages/app.aspx/',
  cdnUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales',
  paredUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales',
  proxyTenant: 'https://OSIPTEL.sharepoint.com',
  proxyUrl: 'https://OSIPTEL.sharepoint.com',
  webRelativeUrl: '/sites/externoperu/creacion-materiales',
  sitePared: 'pared',
  urlForDownloadTest: 'https://OSIPTEL.sharepoint.com',*/

  getRutaBase() {
    return environment.proxyTenant + environment.webRelativeUrl;
  },
  getRutaBaseApp() {
    let rutaBase = '';
    // debugger;
    if (this.production) {
      rutaBase =
        environment.proxyTenant +
        environment.webRelativeUrl +
        environment.appPage;
    } else {
      rutaBase = environment.proxyTenant + '/';
    }

    return rutaBase;
  },
  getRutaParedApp() {
    let rutaBase = '';

    if (this.production) {
      rutaBase = environment.paredUrl;
    } else {
      rutaBase =
        environment.proxyUrl +
        environment.webRelativeUrl +
        '/' +
        environment.sitePared;
    }

    return rutaBase;
  },
};
