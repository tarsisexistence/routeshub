import { BaseRoute, Routes } from '../../../../package';

const appRootChildren: Routes<any> = {
  root: {
    path: ''
  },
  about: {
    path: 'about',
    lazyPath: 'app/views/about/about.module#AboutModule'
  },
  automobile: {
    path: 'automobile',
    lazyPath: 'app/views/automobile/automobile.module#AutomobileModule'
  },
  bike: {
    path: 'bike',
    lazyPath: 'app/views/bike/bike.module#BikeModule'
  },
  bolid: {
    path: 'bolid',
    lazyPath: 'app/views/bolid/bolid.module#BolidModule'
  }
};

export type AppBranch = BaseRoute;

export const appBranch: Routes<AppBranch> = {
  root: {
    path: '',
    children: appRootChildren
  }
};
