// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1, InputFile } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as productActions from './reducer/productDetailActions'
import * as blobActions from '../components-blob/blob-reducer/blobActions'
import {createFormData} from '../components-blob/blobUtils'

class ProductDetail extends Component {
    
    componentDidMount = async() =>{
        const {productId, productDetailMethods} = this.props;
        productId && await productDetailMethods({Id: productId}, 'GetProductDetailByProductId');
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

    sendAction = async (action) => {
        const {
            productDetailMethods, 
            productDetailReducer: {data : {
                Id,
                SubTitle,
                DateCreated,
                Description, 
                BlobId
            }},
            productId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            SubTitle: SubTitle ? SubTitle : '',
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Description: Description ? Description : '',
            ProductId: productId ? productId : '',
            BlobId: BlobId ? BlobId : '',
        }
        await productDetailMethods(model, action);
    }

    actionProductDetail = async () => {
        const {
            productDetailReducer: {
                data : {
                    Id,
                    Blob,
                    fileZip
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            if(fileZip?.length &&  Blob){
                let fileZipAnswer = await this.actionBlob(fileZip, 1 ,[Blob]);
                this.props.productDetailReducer.data.BlobId = fileZipAnswer.Id;
                await this.sendAction('PutProductDetail');
            } else{
                let fileZipAnswer = fileZip?.length && await this.actionBlob(fileZip, 1); 
                this.props.productDetailReducer.data.BlobId = fileZipAnswer.Id;
                await this.sendAction('PutProductDetail');
            }
        }else{
            let fileZipAnswer = fileZip.length && await this.actionBlob(fileZip, 1); 
            this.props.productDetailReducer.data.BlobId = fileZipAnswer.Id;
            fileZipAnswer &&  await this.sendAction('PostProductDetail')
        }
        if(this.props.productDetailReducer.data.Id){
            reDirect && history.push(`${reDirect}/${this.props.productDetailReducer.data.Id}/detail`)
            setModal && setModal();
        }
    }

    render(){
        const {
            productDetailHandleValidation,
            productDetailHandleChange,
            productDetailReducer: {
                data : {
                    Id,
                    SubTitle,
                    Description, 
                    fileZip
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
                    action={this.actionProductDetail}
                    textButton={Id ? 'Guardar Detalle' : 'Agregar Detalle'}
                    textButtonLoading={Id ? 'Guardando Detalle...' : 'Agregando Detalle...'}
                    validations={validations}
                    handleValidations={productDetailHandleValidation}
                >
                    <InputText 
                        classLabel='font-weight-bold'
                        textLabel='Subtitulo'
                        isMandatory='*'
                        classMandatory=''
                        inputType='text'
                        inputName={'SubTitle'}
                        placeHolder={'Introduce un subtitulo '}
                        inputValue={SubTitle}
                        onChange={productDetailHandleChange}
                        maxLength={50}
                        RE={RE_EMPTY}
                        validateRE={validations.SubTitle}
                    />
                    <InputText 
                        classLabel='font-weight-bold'
                        textLabel='Detalles'
                        isMandatory='*'
                        classMandatory=''
                        inputType='textarea'
                        inputName={'Description'}
                        placeHolder={'Introduce detalles'}
                        inputValue={Description}
                        onChange={productDetailHandleChange}
                        maxLength={500}
                        RE={RE_EMPTY}
                        validateRE={validations.Description}
                    />
                    <InputFile
                        classLabel='font-weight-bold'
                        textLabel='Sube un .zip con tus archivos'
                        isMandatory=''
                        classMandatory=''
                        inputType='file'
                        inputName='fileZip'
                        inputId='fileZip-video'
                        inputValue={fileZip ? fileZip : ''}
                        onChange={productDetailHandleChange}
                        validateRE={validations.fileZip}
                    /> 
                </Form1>
            </>
        )
    }
}

const mapStateToProps = ({productDetailReducer,  blobReducer}) => {
    return {productDetailReducer,  blobReducer}
}

const mapDispatchToProps = {
    ...productActions,
    ...blobActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);