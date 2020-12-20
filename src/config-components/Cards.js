// Imports de react.
import React from 'react'
import { Card, CardBody } from 'reactstrap'

// FontAwesome Icons.
import * as FaIcons from "react-icons/fa"

export const CardAnalytics = ({title, number, icon}) => {
    const rTitle = title ? title : 'title';
    const rNumber = number ? number : '0'
    const rIcon = icon ? icon : <FaIcons.FaVideo className="mr-2" />;
    return (
        <Card className="border-0 my-3">
            <CardBody>
                <p className="text-muted mb-2">{rIcon} {rTitle}</p>
                <h5 className="display-4 text-dark">{rNumber}</h5>
                {/* <div className="d-inline-block text-success mr-2"><FaIcons.FaArrowUp className="mr-2" />0%</div><p className="text-dark d-inline-block mb-0">vs los últimos 7 días</p> */}
            </CardBody>
        </Card>   
    )
}
