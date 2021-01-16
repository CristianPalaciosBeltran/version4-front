import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as postionActions from './reducer/positionActions'
const ReadPosition = ({positionId}) => {
    debugger
    const positionReducer = useSelector(state => state.positionReducer);
    const dispatch = useDispatch();

    const { data:{
        Description,
        Salary,
        Objective
    }} = positionReducer;
    useEffect(() => {
        dispatch(postionActions.positionMethods({Id: positionId},'GetPosition'))
        return () => {
            dispatch(postionActions.positionCleanState());
        }
    }, [dispatch, positionId])
    let arrayDeCadenas = Description.split('-');
    arrayDeCadenas.splice(0, 1);
    return (
        <div>
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Objetivo:</div>
                <div className={'text-muted'}>{Objective}</div>
            </div>
            <div className='mb-2'>
                <div className={'font-weight-bold'}>Responsabilidades:</div>
                <ul>
                    {arrayDeCadenas.map(item => {
                        return (
                                <li className='text-muted'>{item}</li>
                            )
                        }    
                    )}
                </ul>
            </div>
            <div className='mb-4'>
                <div className={'text-dark'}>Puntos:</div>
                <div className={'text-muted'}>{Salary ? Salary: 0}</div>
            </div>
            
        </div>
    )
}

export default ReadPosition;