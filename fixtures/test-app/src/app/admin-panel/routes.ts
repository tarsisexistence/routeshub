import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

export const routes = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminPanelComponent
  }
]);
