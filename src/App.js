// Imports de react.
import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Imports del landing page
import * as Landings from './pages/landing'
import {NotFoundPage} from './pages/NotFoundPage'

// Imports de PageSessions.
//import {LoginPage} from './pages/Login'
import {
  LoginPage,
  SignUpPage,
  ForgotPassword,  
  CheckYourAccount,
  ChangePasswordPage
} from './pages/session'

// Imports de Páginas del administrador
import {
  AdminUsersPages, 
  AdminSectionsPages, 
  AdminCoursesPages,
  AdminProductPages,
  AdminDashboardPages,
  AdminCompanyPages,
  AdminPositionsPages,
  AdminOrganizationChart,
  AdminPersonalDetail,
  AdminArea
}from './pages/admin'

/* Imports de Páginas de usario */
import {DashboardUserPage} from './pages/user'

import {OrganizationChart} from './components-organization-chart'

function App() {
  return (
      <BrowserRouter >
        <Switch>
          {/* Páginas de Home */}
          <Route  exact path="/" component={Landings.SoftwareAgency}></Route>
          <Route  exact path="/products" component={Landings.Products}></Route>

         

          {/* Páginas para el manejo de sesión */}
          <Route  exact path="/login" component={LoginPage}></Route>
          <Route  exact path="/sign-up" component={SignUpPage}></Route>
          <Route  exact path="/forgot-password" component={ForgotPassword}></Route>
          <Route  exact path="/check-your-account" component={CheckYourAccount}></Route>
          <Route  exact path="/change-password/:code/:email" component={ChangePasswordPage}></Route>
  
          {/* Páginas para el admin */}
          <Route  exact path="/admin-dashboard" component={AdminDashboardPages.Dashboard}></Route>
          <Route  exact path="/admin-dashboard/:indicator" component={AdminDashboardPages.Dashboard}></Route>
          <Route  exact path="/admin-dashboard-read-user/:userId" component={AdminUsersPages.ReadUser}></Route>
          <Route  exact path="/admin-dashboard-read-admin/:userId" component={AdminUsersPages.ReadAdmin}></Route>
          { /* crud empresas */ }
          <Route  exact path="/admin-dashboard/create-company/:userId" component={AdminCompanyPages.CreateCompany}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId" component={AdminCompanyPages.Indicators}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/positions" component={AdminPositionsPages.ListOfPositions}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/create-position" component={AdminPositionsPages.CreatePosition}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/update-position/:positionId" component={AdminPositionsPages.UpdatePosition}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/organization-chart" component={AdminOrganizationChart.OrgainaztionChart}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/organization-chart/node/:nodeId" component={AdminOrganizationChart.UpdateCurrent}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/employees" component={AdminPersonalDetail.ListOfPersonDetails}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/create-personal-detail" component={AdminPersonalDetail.CreatePersonDetail}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/update-personal-detail/:personalDetailId" component={AdminPersonalDetail.UpdatePersonDetail}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/areas" component={AdminArea.ListOfAreas}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/create-area" component={AdminArea.CreateArea}></Route>
          <Route  exact path="/admin-dashboard/company/:companyId/update-area/:areaId" component={AdminArea.UpdateArea}></Route>

         
          {/* <Route  exact path="/admin-dashboard/company/:companyId/organization-chart" component={OrganizationChart}></Route> */}

          <Route  exact path="/admin-dashboard/product/:productId/:section" component={AdminProductPages.EditProduct}></Route>
          { /* crud videos para admins */ }
          <Route  exact path="/admin-dashboard/course/:courseId" component={AdminCoursesPages.EditCourse}></Route>
          <Route  exact path="/admin-dashboard/section/:courseId" component={AdminSectionsPages.CreateSection}></Route>
          <Route exact path="/player/watch-class/:productId/:courseId" component={AdminCoursesPages.WhatchCourse}/>

          {/* Páginas para dashboard de usuarios */}
          <Route  exact path="/user-dashboard" component={DashboardUserPage}></Route>

          <Route  exact path="/organigrama-prueba" component={OrganizationChart}></Route>


          {/* Vista pare ver un video de un curso */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
