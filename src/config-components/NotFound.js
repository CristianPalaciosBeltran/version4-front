import React from 'react'
import {Link} from 'react-router-dom'
import {
    Card, CardBody,
} from 'reactstrap';

export const NotFound = () => {
    return (
        <Card className="card-form mx-auto text-center border-0">
            <CardBody>
                <h4 className="display-1 font-weight-bold mb-0">404</h4>
                <h4 className="text-muted mb-4">Página no encontrada</h4>
                <Link to='/' className="btn btn-primary">Regresar a inicio</Link>
            </CardBody>
        </Card>
    )
}

