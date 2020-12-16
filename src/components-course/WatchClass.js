import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {Navbars} from '../config-components'
import {PlayerMedia} from '../components-player'
import { Row, Col } from 'reactstrap';
import CollapseSection from '../config-components/Collapse'
import TabCourse from '../config-components/TabCourse'

import * as productActions from '../components-product/reducer/productActions';
import * as sectionActions from '../components-section/reducer/sectionActions';


export const WatchClass = () => {
    const sectionReducer = useSelector(state => state.sectionReducer);
    const stateProduct = useSelector(state => state.productReducer)
    const dispatch = useDispatch();
    const {productId, courseId} = useParams();
    useEffect(() => {
        dispatch(productActions.productMethods({Id: productId},'get_product'));
        dispatch(sectionActions.sectionMethods({Id: courseId},'get_list_sections_by_course_id_with_products'))
    }, [productId, courseId, dispatch])

    const {
        api_actions: {cargando, error},
        list_sections
    } = sectionReducer;

    return (
        <div>
            <Navbars.NavbarAdmin /> 
            <Row className="no-gutters">
                <Col lg="8">
                    <PlayerMedia.Player 
                        url={stateProduct.data.Blobs?.length > 0 
                            ? stateProduct.data.Blobs[0].Uri
                            : ''
                    }
                    />  
                    <TabCourse />
                </Col>
                <Col lg="4" className="border-left">
                    <div>
                        <div className="p-3 border-bottom shadow-sm">
                            <h6 className="font-weight-bold mb-0">Contenido del curso</h6>
                        </div>
                        <div>
                            <div>
                                {list_sections.map(section => {
                                    return (
                                        <CollapseSection 
                                            title={section.SectionName} 
                                            countVideos={section.Products.length} 
                                            videos={section.Products}
                                        />
                                    )
                                })}
                                
                                
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}