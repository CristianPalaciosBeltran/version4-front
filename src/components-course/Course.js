// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1, InputFile } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as productActions from '../components-product/reducer/productActions'
import * as blobActions from '../components-blob/blob-reducer/blobActions'
import {createFormData} from '../components-blob/blobUtils'
class Course extends Component {
    
    componentDidMount = async() =>{
        const {productId, productMethods, } = this.props;
        productId && await productMethods({Id: productId}, 'GetProduct');
        this.props.productReducer.data.ProductCategoryId = 6;
    }

    actionBlob =  async (file, blobType ,blobs = []) => {
        const {blobMethods} = this.props;
        const formData = createFormData(file[0], blobType, "publicproducts", false);
        if(blobs.length > 0){ // put blob
            await blobMethods(
                { id: blobs[0].Id, blob: formData },
                "put_blob"
            );
        }else{ // post blob
            const formData = createFormData(file[0], blobType, "publicproducts", false);
            await blobMethods(formData, "post_blob");
        }
        return this.props.blobReducer.data;
    }

    sendAction = async (action, blobs = []) => {
        const {
            productMethods, 
            productReducer: {data : {
                Id,
                Name,
                DateCreated,
                Description, 
                Price,
                ProductCategoryId,
                
            }},
            
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            Name: Name ? Name : '',
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Description: Description ? Description : '',
            Price: Price ? Price : 0,
            ProductCategoryId: ProductCategoryId ? ProductCategoryId : '',
            Blobs: blobs ? blobs : '',
            includeBlobs: blobs.length > 0 && true
        }
        await productMethods(model, action);
    }

    actionProduct = async () => {
        const {
            productReducer: {
                data : {
                    Id,
                    Blobs,
                    fileCover
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            if(fileCover?.length &&  Blobs?.length > 0){
                await this.actionBlob(fileCover, 2 ,Blobs)
                await this.sendAction('PutProduct');
            } else{
                let fileCoverAnswer = fileCover?.length && await this.actionBlob(fileCover, 2); 
                fileCoverAnswer 
                    ? await this.sendAction('PutProduct', [fileCoverAnswer])
                    : await this.sendAction('PutProduct');
            }
        }else{
            //TODO: revisar porque al crear el curso truena
            await this.sendAction('PostProduct')
            let fileCoverAnswer = fileCover.length && await this.actionBlob(fileCover, 2); 
            fileCoverAnswer && await this.sendAction('PutProduct', [fileCoverAnswer])
        }
        if(this.props.productReducer.data.Id){
            reDirect && history.push(`${reDirect}${this.props.courseReducer.data.Id}`)
            setModal && setModal();
        }
    }

    render(){
        const {
            productHandleValidation,
            productHandleChange,
            productReducer: {
                data : {
                    Id, 
                    Name,
                    Price,
                    Description, 
                    fileCover,
                },
                api_actions: {cargando, error},
                validations,
            },
            blobReducer,
        } = this.props;
        return(
            <>
            
            <Form1
                loading={
                    cargando 
                        ? cargando : 
                        blobReducer.api_actions.cargando 
                        ? blobReducer.api_actions.cargando 
                        : false 
                    }
                error={error}
                action={this.actionProduct}
                textButton={Id ? 'Guardar Producto' : 'Agregar Producto'}
                textButtonLoading={Id ? 'Guardando Producto...' : 'Agregando Producto...'}
                validations={validations}
                handleValidations={productHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Nombre'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'Name'}
                    placeHolder={'Introduce un Nombre'}
                    inputValue={Name}
                    onChange={productHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Descripción'
                    isMandatory='*'
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Description'}
                    placeHolder={'Introduce una Nombre'}
                    inputValue={Description}
                    onChange={productHandleChange}
                    maxLength={500}
                    RE={RE_EMPTY}
                    validateRE={validations.Description}
                />

                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Precio'
                    isMandatory='*'
                    classMandatory=''
                    inputType='number'
                    inputName={'Price'}
                    placeHolder={'Introduce un Nombre'}
                    inputValue={Price}
                    onChange={productHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Price} 
                />

                <InputFile
                    classLabel='font-weight-bold'
                    textLabel='Sube una portada'
                    isMandatory=''
                    classMandatory=''
                    inputType='file'
                    inputName='fileCover'
                    inputId='fileCover-video'
                    inputValue={fileCover ? fileCover : ''}
                    onChange={productHandleChange}
                    validateRE={validations.fileCover}
                /> 
                
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({productReducer,  blobReducer}) => {
    return {productReducer,  blobReducer}
}

const mapDispatchToProps = {
    ...productActions,
    ...blobActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);