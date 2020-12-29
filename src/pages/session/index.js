// Imports de react.
import React from 'react';
import {Link, useHistory, useParams} from 'react-router-dom'
import {
    Container, 
    Card, 
    CardBody,
} from 'reactstrap';
import {Logos, Navbars} from '../../config-components'



// Imports de sessión components
import {Login, SendEmail, ChangePassword, SignUp} from '../../components-session'

const LayoutSection = ({children, message='',classSection='', classContainer='', classLogo= '', classCard='', classCardBody = ''}) =>{
    return (
        <section className={classSection}>
            <Container className={ classContainer}>
                <Card className={classCard}>
                    <CardBody className={classCardBody}>
                        {children} 
                        {message}
                    </CardBody>
                </Card>
            </Container>
        </section>
    )
}

export const LoginPage = () => {
    return (
        <>
        <Navbars.Navbars />
        <section className="bg-light h-100 py-6 mt-5">
            <Container>
                <Card className="mx-auto card-form border-0">
                    <CardBody>
                        {/* <h4 className="font-weight-bold mb-4">Iniciar sesión</h4>      */}
                        <Login />   
                        {/* <p className="text-center mb-0">¿No tienes una cuenta? <Link to='/sign-up'>Crea una cuenta</Link></p> */}
                    </CardBody>
                </Card>
            </Container>
        </section>
        </>
    );
};

export const ForgotPassword = () => {
    const history = useHistory();
    return (
        <>
        <Navbars.Navbars />
        <section className="bg-light h-100 py-6 mt-5">
            <Container>
                <Card className="mx-auto card-form border-0">
                    <CardBody>
                        <h4 className="font-weight-bold mb-0">Restablecer contraseña</h4>     
                        <p className="text-muted">Ingresa el email que tienes registrado</p>
                        <SendEmail
                            history={history}
                            reDirect='/check-your-account'
                        />   
                    </CardBody>
                </Card>
            </Container>
        </section>
        </>
    );
};

export const CheckYourAccount = () => {
    return (
        <>
        <Navbars.Navbars />
        <section className="bg-light h-100 py-6 mt-5">
            <Container>
                <Card className="mx-auto card-form border-0">
                    <CardBody>
                        <h4 className="font-weight-bold mb-4">Revisa tu correo</h4>     
                        <p className="text-muted">Te hemos enviado código a tu email, si no 
                            lo ves en tu bandeja de entrada, revisa en spam y correos no deseados.</p> 
                        <Link to="/login"  className="btn btn-primary w-100">Iniciar sesión</Link>
                    </CardBody>
                </Card>
            </Container>
        </section>
        </>
    );
};

export const ChangePasswordPage = () => {
    const {code, email} = useParams();
    const history = useHistory();
    return (
        <>
        <Navbars.Navbars />
        <section className="bg-light h-100 py-6">
            <Container>
                <Card className="mx-auto card-form border-0">
                    <CardBody>
                        <h4 className="font-weight-bold mb-4">Restablecer Contraseña</h4>    
                        <p className="text-muted mb-4">Ingresa el email que tienes registrado</p>
                        <ChangePassword reDirect='/login' code={code} email={email} history={history}/>
                    </CardBody>
                </Card>
            </Container>
        </section>
        </>
    );
};

export const SignUpPage = () => {
    const history = useHistory();
    return (
        <>
            <Navbars.Navbars />
            <LayoutSection
                classSection='bg-light h-100 py-6 mt-5'
                classCard='mx-auto card-form border-0'
                message={
                    <p className="text-center mb-0">¿Ya tienes una cuenta? <Link to='/login'>Inicia Sesión</Link></p>
                }
            >
                <h4 className="font-weight-bold mb-4">Registrate</h4>     
                <SignUp history={history} role='User' reDirect={'/check-your-account'} />
            </LayoutSection>      
        </>
    )
}



