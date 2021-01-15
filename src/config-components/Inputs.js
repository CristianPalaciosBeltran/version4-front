// Imports de react.
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Input, Label, FormGroup, FormFeedback, Form, Button, Col} from 'reactstrap'
import {RegularExpressions} from './index'
import {ApiResponses} from '../components-api'


// Hook para manejar el cambio en inputs.
export const useInputState = (inputValue) => {
    const [inputChange, setInputChange] = useState(inputValue);
    const setOnChange = (e) => {
        setInputChange(e)
    }
    return {inputChange, setOnChange}
}


// Input para textos.
export const InputText = ({forName, 
    classLabel,
    textLabel, 
    isMandatory,
    classMandatory,
    inputType,
    inputName,
    inputId,
    placeHolder,
    inputValue,
    onChange,
    maxLength,
    minLength,
    RE,
    validateRE,
    options,
    optionPlaceHolder,
    forgotPassword = false,
    xs='12',
    sm='12',
    md='12',
    lg='12',
    xl='12',
    classCol='px-0'
}) => {
    const rFor = forName ? forName : 'for';
    const rClassLabel = classLabel ? classLabel : '';
    const rTextLabel = textLabel ? textLabel : '';
    const rIsMandatory = isMandatory ? isMandatory : '';
    const rClassMandatory = classMandatory ? classMandatory : 'text-danger';
    const rInputType = inputType ? inputType : 'text';
    const rInputName = inputName ? inputName : '';
    const rInputId = inputId ? inputId : '';
    const rPlaceHolder = placeHolder ? placeHolder : '';
    const rInputValue = inputValue ? inputValue : '';
    const rMaxLength = maxLength ? maxLength : 524288;
    const rMinLength = minLength ? minLength : 0;
    const rRE = RE ? RE : '';

    const handleRE = (e) =>{
        
        validateRE = e.target.value.match(rRE.re) ? true : false;
        if(validateRE && e.target.value === '' && isMandatory){
            validateRE = false;
        }
        if(!validateRE && e.target.value === '' && !isMandatory){
            validateRE = '';
        }
        onChange(e.target, validateRE);
    }

    return (
        <Col 
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={classCol}
        >
            <FormGroup>
                <Label
                    for={rFor}
                    className={`${rClassLabel} d-flex justify-content-between`}
                >
                        <div>
                            {rTextLabel} <span className={rClassMandatory}>{rIsMandatory}</span>
                        </div>
                        {forgotPassword && <small>
                            <Link to='/forgot-password'>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </small>}
                </Label>
                <Input
                    type={rInputType}
                    name={rInputName}
                    id={rInputId}
                    placeholder={rPlaceHolder}
                    value={rInputValue}
                    onChange={(e)=>handleRE(e)}
                    maxLength={rMaxLength}
                    minLength={rMinLength}
                    valid={validateRE === true && true }
                    invalid={validateRE === false && true}
                >
                    {
                        options && 
                        <>
                            <option value="">{optionPlaceHolder}</option>
                            {options.map(option => {
                                return <option key={option.Id} value={option.Id}>{option.Name}</option>
                            })}
                        </> 
                    }
                </Input>
                <FormFeedback  valid >{validateRE && rRE.validMessage}</FormFeedback>
                <FormFeedback  invalid >{validateRE === false && rRE.invalidMessage}</FormFeedback>

            </FormGroup>
        </Col>
    )
}

// Input para correo.
export const InputEmail = ({name, inputValue, onChange, label, RE, validateRE}) => {
    const rName = name ? name : 'Email';
    const rInputValue = inputValue ? inputValue : '';
    const rLabel = label ? label : 'Email';
    const rRE = RE ? RE : RegularExpressions.RE_EMAIL;
    return <InputText
            forName='Email'
            classLabel='font-weight-bold'
            textLabel={rLabel}
            isMandatory='*'
            classMandatory=''
            inputType='text'
            inputName={rName}
            inputId='Email'
            placeHolder={`Introduce tu ${rLabel}`}
            inputValue={rInputValue}
            onChange={onChange}
            maxLength={100}
            minLength={20}
            RE={rRE}
            validateRE={validateRE}
        />
}

export const InputPassword = ({
    inputValue, 
    onChange, 
    validateRE, 
    forgotPassword = false,
    RE = RegularExpressions.RE_PASSWORD,
    inputName = 'password',
    textLabel = 'Contraseña'
}) => {
    const rInputValue = inputValue ? inputValue : '';
    return <InputText
            forName='Password'
            classLabel='font-weight-bold'
            textLabel={textLabel}
            isMandatory='*'
            classMandatory=''
            inputType='password'
            inputName={inputName}
            inputId='password'
            placeHolder='Introduce tu contraseña'
            inputValue={rInputValue}
            onChange={onChange}
            maxLength={100}
            minLength={1}
            RE={RE}
            validateRE={validateRE}
            forgotPassword={forgotPassword}
        />
}


export const InputFile = ({//forName, 
    classLabel,
    textLabel, 
    isMandatory,
    classMandatory,
    inputType,
    inputName,
    inputId,
    onChange,
    RE,
    validateRE,
   
}) => {
    const rClassLabel = classLabel ? classLabel : '';
    const rTextLabel = textLabel ? textLabel : '';
    const rIsMandatory = isMandatory ? isMandatory : '';
    const rClassMandatory = classMandatory ? classMandatory : 'text-danger';
    const rInputType = inputType ? inputType : 'text';
    const rInputName = inputName ? inputName : '';
    const rInputId = inputId ? inputId : '';
 
    const handleRE = (e) =>{
        if(validateRE && e.target.value === [] && isMandatory){
            validateRE = false;
        }else {
            validateRE = true;
        }
        onChange(e.target, validateRE);
    }

    return (
        <FormGroup>
            <Label
                className={rClassLabel}
            >
                {rTextLabel} <span className={rClassMandatory}>{rIsMandatory}</span>
            </Label>
            <Input
                type={rInputType}
                name={rInputName}
                id={rInputId}
                onChange={(e)=>handleRE(e)}
                valid={validateRE === true && true }
                invalid={validateRE === false && true}
            />
            <FormFeedback  valid >{validateRE && 'archivo valido'}</FormFeedback>
            <FormFeedback  invalid >{validateRE === false && 'archivo invalido'}</FormFeedback>
        </FormGroup>
    )
}
  
export const ValidateInputs = (validations, e, onValidate) => {
    e.preventDefault()
    for(let i = 0; i < validations.length ; i++){
        if(validations[i] !== '' && validations[i].props.isMandatory === '*' ){
            if(!validations[i].props.validateRE || validations[i].props.validateRE === ""){
                let model = {
                    name: validations[i].props.inputName,
                    isInvalid: false
                }
                onValidate(model);
                return false;
            }
        }
    }
    return true;
}

export const Form1 = ({children, 
    loading, 
    error, 
    action,
    textButton,
    textButtonLoading,
    handleValidations,
}) => {
    const HandleAction = (e) =>{
        const isValid = ValidateInputs(children, e, handleValidations);
        if(isValid) {
            action();
        }
    }
    return <Form className={'d-flex flex-wrap'}>
        {children}
        <ApiResponses.Error message={error}/> 
        {loading ? 
            <Button color="primary" className="w-100 mb-3" >{textButtonLoading}<ApiResponses.Loader activate={loading}  color={'light'} /></Button>  :
            <Button color="primary" className="w-100 mb-3" onClick={HandleAction}>{textButton} <ApiResponses.Loader activate={loading}  color={'light'} /></Button>
        }
         
    </Form>
}