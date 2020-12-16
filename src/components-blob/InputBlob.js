// Imports de react.
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';

// Import config-components.
import {Inputs} from '../config-components'

import * as blobActions from '../components-blob/blob-reducer/blobActions'
import {createFormData} from '../components-blob/blobUtils'

export const InputBlobs = ({reducer, handleChange, putAction, blobType, fileName}) => {
    const stateReducer = useSelector(state => state[reducer])
    //const stateBlob = useSelector(state => state.blobReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        const actionBlob =  async (file, blobType ,blobs = []) => {        
            const formData = createFormData(file[0], blobType, "publicproducts", false);
            if(blobs.length > 0){ // put blob
                dispatch(blobActions.blobMethods(
                    { id: blobs[0].Id, blob: formData },
                    "put_blob"
                ));
            }else{ // post blob
                const formData = createFormData(file[0], 3, "publicproducts", false);
                dispatch(blobActions.blobMethods(formData, "post_blob"));

                const model = {
                    Id : stateReducer.data.Id,
                    Blobs : blobs
                }
                dispatch(putAction(model, 'put_product'));

            }
     
            return this.props.blobReducer.data;
        }

        if(stateReducer.data.Id && stateReducer.data[fileName]){
            let blob = stateReducer.data.Blobs.filter(el => el.BlobTypeId === blobType)
            actionBlob(stateReducer.data[fileName], blobType, [blob]);
        }
        return () => {
            //cleanup
        }
    }, [
        fileName,
        putAction,
        blobType,
        stateReducer,
        dispatch
    ])

    return (
        <Inputs.InputFile
            classLabel='font-weight-bold'
            textLabel='Sube un archivo'
            isMandatory='*'
            classMandatory=''
            inputType='fileCover'
            inputName='fileCover'
            inputId='fileCover-video'
            inputValue={
                stateReducer.data[fileName] ? 
                stateReducer.data[fileName] : ''
            }
            onChange={handleChange}
            validateRE={stateReducer.validations[fileName]}
        />
    )
}