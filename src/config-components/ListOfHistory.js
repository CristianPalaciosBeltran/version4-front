import React from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from "react-icons/fa"
export const Li = ({items}) => {
    return (
        <ul className="list-inline m-4">
            {items.map(item => {
                return(
                    <li key={item} className="list-inline-item">
                        <small  className={`${item?.last && 'font-weight-bold'}`}>
                            {
                                !item?.last ? 
                                <Link 
                                    to={`${item.href}`} 
                                    className={`text-muted`}
                                >
                                    {item.name}
                                </Link> :
                                item.name
                            }
                             
                            
                            {!item?.last && <FaIcons.FaChevronRight className="ml-1" /> }
                        </small>
                    </li>
                )
            })}         
        </ul>
    )
}