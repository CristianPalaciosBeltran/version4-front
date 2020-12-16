// Imports de react.
import React from 'react'

import {ListOfProducts} from '../components-product'

const ListOfCourses = ({reDirect}) => {
    return(
        <ListOfProducts 
            title={'Cursos'} 
            categoryProductId={6} 
            reDirect={reDirect}
        />
    )
}

export default ListOfCourses

