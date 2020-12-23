// Imports de redux.
import { combineReducers } from "redux";

// Components-session.
import loginReducer from "../components-session/reducer-login/loginReducer";
import signUpReducer from "../components-session/sign-up-reducer/signUpReducer";
import changePasswordReducer from "../components-session/change-password/reducer/changePasswordReducer";

// Components
import companyReducer from '../components-company/reducer/companyReducer'
import positionReducer from '../components-position/reducer/positionReducer'
import organizationChartReducer from '../components-organization-chart/reducer/organizationChartReducer'

// Components que tienen que ver con producto.
import categoryReducer from '../components-category/reducer/categoryReducer'
import categoryProductReducer from '../components-category-product/reducer/categoryProductReducer'
import productReducer from '../components-product/reducer/productReducer'
import productDetailReducer from '../components-product-details/reducer/productDetailReducer'


// Componentes que tienen que ver con cursos.
import courseReducer from '../components-course/reducer/courseReducer'
import sectionReducer from '../components-section/reducer/sectionReducer'

// Componentes de administrador.
import adminReducer from '../components-admin/reducer/adminReducer'
// Components de analiticos.
import analyticsReducer from '../components-analytics/reducer/analyticsReducer'

// Componentes de blobs.
import blobReducer from '../components-blob/blob-reducer/blobReducer'

// Reducers.
export default combineReducers({
    // Reducers de sesión.
    loginReducer,
    changePasswordReducer,
    signUpReducer,
    // Components.
    companyReducer,
    positionReducer,
    organizationChartReducer,
    categoryReducer,
    categoryProductReducer,
    productReducer,
    productDetailReducer,
    // Componentes que tienen que ver con cursos.
    courseReducer,
    sectionReducer,
    // Componentes de administrador.
    adminReducer,
    // Componentes de analiticos.
    analyticsReducer,
    // Componentes de blobs
    blobReducer
});
