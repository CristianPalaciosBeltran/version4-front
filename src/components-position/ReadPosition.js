import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as organizationChartActions from '../components-organization-chart/reducer/organizationChartActions'

const ReadPosition = ({positionChartId}) => {

    const organizationChartReducer = useSelector(state => state.organizationChartReducer);
    const dispatch = useDispatch();

    const { read_child } = organizationChartReducer;
    useEffect(() => {
        dispatch(organizationChartActions.organizationChartMethods({positionChartId},'GetPositionFromOrganization', 'loading-child'))
    }, [dispatch, positionChartId])

    let arrayDeCadenas;
    if(read_child.Responsibilities){
        arrayDeCadenas = read_child.Responsibilities.split('-');
        arrayDeCadenas.splice(0, 1);
    } 

    let arrayDeCadenas2;
    if(read_child.Competencias){
        arrayDeCadenas2 = read_child.Competencias.split('-');
        arrayDeCadenas2.splice(0, 1);
    } 

  
    
    return (
        <div className={'mb-4'}> 
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Puesto:</div>
                <div className={'text-muted'}>{read_child.PositionName}</div>
            </div>
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Objetivo:</div>
                <div className={'text-muted'}>{read_child.Objective}</div>
            </div>
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Responsabilidades:</div>
                <ul>
                    {arrayDeCadenas ? arrayDeCadenas.map(item => {
                        return (
                                <li className='text-muted'>{item}</li>
                            )
                        }    
                    ) : 'No hay responsabilidades asignadas a este puesto.'}
                </ul>
            </div>
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Competencias:</div>
                <ul>
                    {arrayDeCadenas2 ? arrayDeCadenas2.map(item => {
                        return (
                                <li className='text-muted'>{item}</li>
                            )
                        }    
                    ) : 'No hay competencias asignadas a este puesto.'}
                </ul>
            </div>
            <div className='mb-4'>
                <div className={'font-weight-bold'}>Puntos: <span  className={'text-muted'}>{read_child.Puntos ? read_child.Puntos: 0}</span></div>
            </div>   
        </div>
    )
}

export default ReadPosition;