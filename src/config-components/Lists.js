import React from 'react'

export const ShowListFromText = ({description = []}) => {

    if(!description){
        return 'no hay información';
    }

    let arrayDeCadenas = description.split('-');
    arrayDeCadenas.splice(0, 1);

    return(
        <ul>
            {arrayDeCadenas.map(item => {
                return (
                        <li>{item}</li>
                    )
                }    
            )}
        </ul>
    )
}