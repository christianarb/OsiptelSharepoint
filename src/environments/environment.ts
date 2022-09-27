// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appPage: "/SitePages/Home.aspx/",
  proxyTenant: "http://localhost:4200",
  proxyUrl: "http://localhost:6969",
  webRelativeUrl: "/sites/elysium20",
  sitePared: "pared",
  urlForDownloadTest: 'https://agpglass.sharepoint.com',

   /*appPage: '/SitePages/app.aspx/',
   cdnUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales/',
   paredUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales/',
   proxyTenant: 'https://OSIPTEL.sharepoint.com',
   proxyUrl: 'https://OSIPTEL.sharepoint.com',
   webRelativeUrl: '/sites/externoperu/creacion-materiales',
   sitePared: 'pared',
   urlForDownloadTest: 'https://OSIPTEL.sharepoint.com',
*/
  // appPage: '/SitePages/app.aspx/',
  // cdnUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales',
  // paredUrl: 'https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales',
  // proxyTenant: 'https://OSIPTEL.sharepoint.com',
  // proxyUrl: 'https://OSIPTEL.sharepoint.com',
  // webRelativeUrl: '/sites/externoperu/creacion-materiales',
  // sitePared: 'pared',
  // urlForDownloadTest: 'https://OSIPTEL.sharepoint.com',


  getRutaBase() {
    return "https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales";
    // return "https://OSIPTEL.sharepoint.com/sites/externoperu/creacion-materiales";
  },
  getRutaBaseApp() {
    let rutaBase = "";

    if (this.production) {
      rutaBase =
        environment.proxyTenant +
        environment.webRelativeUrl +
        environment.appPage;
    } else {
      rutaBase = environment.proxyTenant + "/";
    }

    return rutaBase;
  }
};
