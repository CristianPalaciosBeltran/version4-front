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
  AdminDashboardPages
}from './pages/admin'

/* Imports de Páginas de usario */
import {DashboardUserPage} from './pages/user'

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
          { /* crud productos para admins */ }
          <Route  exact path="/admin-dashboard/product/:productId/" component={AdminProductPages.EditProduct}></Route>
          <Route  exact path="/admin-dashboard/product/:productId/:section" component={AdminProductPages.EditProduct}></Route>
          { /* crud videos para admins */ }
          <Route  exact path="/admin-dashboard/course/:courseId" component={AdminCoursesPages.EditCourse}></Route>
          <Route  exact path="/admin-dashboard/section/:courseId" component={AdminSectionsPages.CreateSection}></Route>
          <Route exact path="/player/watch-class/:productId/:courseId" component={AdminCoursesPages.WhatchCourse}/>

          {/* Páginas para dashboard de usuarios */}
          <Route  exact path="/user-dashboard" component={DashboardUserPage}></Route>

          {/* Vista pare ver un video de un curso */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
