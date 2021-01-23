import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'

import {Tabs} from '../config-components'

const ReadChild = ({positionChartId, tab}) => {
    debugger
    const organizationChartReducer = useSelector(state => state.organizationChartReducer);
    const dispatch = useDispatch();

    const { read_child } = organizationChartReducer;
    useEffect(() => {
        dispatch(organizationChartActions.organizationChartMethods({positionChartId},'GetPositionFromOrganization', 'loading-child'))
        // return () => {
        //     dispatch(organizationChartActions.organizationChartCleanState());
        // }
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
        <div>
            <Tabs.Tabs tab={tab}
                children1={
                    <>
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
                    </>
                }
                children2={
                    <>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>nombre:</div>
                            <div className={'text-muted'}>{read_child.PersonName}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Sexo:</div>
                            <div className={'text-muted'}>{read_child.Sexo}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Fecha de nacimiento:</div>
                            <div className={'text-muted'}>{read_child.Birthdate}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>RFC:</div>
                            <div className={'text-muted'}>{read_child.RFC}</div>
                        </div>
                    </>
                }
                children3={
                    <>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Fecha de admisión:</div>
                            <div className={'text-muted'}>{read_child.DateAdmission}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Contrato:</div>
                            <div className={'text-muted'}>{read_child.Contract}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Beneficios:</div>
                            <div className={'text-muted'}>{read_child.Benefits}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Salario diario:</div>
                            <div className={'text-muted'}>{read_child.DailySalary}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Salario Integrado:</div>
                            <div className={'text-muted'}>{read_child.IntegratedSalary}</div>
                        </div>
                        <div className='mb-2'>
                            <div className={'font-weight-bold'}>Tipo:</div>
                            <div className={'text-muted'}>{read_child.Type}</div>
                        </div>
                    </>
                }
            ></Tabs.Tabs>  
        </div>
    )
}

export default ReadChild;