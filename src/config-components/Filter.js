// Imports de react.
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {DropdownItem, Form, FormGroup, Input, Table} from 'reactstrap'

// FontAwesome Icons.
import * as FaIcons from "react-icons/fa"

// Imports de components.
import {Loader, Error} from '../components-api/ApiResponses'
import {DropDownActions} from '../config-components/DropDowns'

export const UseSearchItems = (list, propertiesTable) => {
  const [searchByItem, setSearchItem] = useState(propertiesTable);

  const [query, setQuery] = useState("");

  React.useMemo(() => {
    const filteredSome = list.filter((items) => {
      let res = "";
      res += propertiesTable.map((property) => {
        return `${items[property]} `;
      });
      return res.toLowerCase().includes(query.toLowerCase());
    });
    setSearchItem(filteredSome);
  }, [list, query, propertiesTable]);

  return { query, setQuery, searchByItem };
};

export const TableFilter = ({
    title, 
    titlesTable,
    propertiesTable,
    bodyTable,
    loading,
    error,
    hrefCreate,
    actions
}) => {
    const rTitle = title ? title : 'Titulo';
    const rHrefCreate= hrefCreate ? hrefCreate : '/admin-dashboard';

    const { query, setQuery, searchByItem } = UseSearchItems(
        bodyTable,
        propertiesTable
    );
    return (
        <>
            <div className="d-flex mb-4">
                <h3 className="flex-grow-1">{rTitle}</h3>
                
                <div>
                    <Form>
                        <FormGroup className="d-flex">
                            <Input 
                                className="mr-3" 
                                type="text" 
                                placeholder="Buscar..." 
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                            <Link to={rHrefCreate} className={'btn btn-primary'}>Crear</Link>
                        </FormGroup>
                    </Form>
                </div>
            </div>
            <Table className="bg-white">
                <thead>
                    <tr>
                        {titlesTable.map(title => {
                            return(
                            <th>{title}</th>
                            )
                        })}
                    </tr>
                </thead>
                {
                    error ? <Error message={error} /> :
                    loading ? <Loader activate={loading}/> : 
                    <tbody>
                        {searchByItem?.map(item => {
                            return(
                                <tr>
                                    {propertiesTable?.map(property => {
                                        return <td>{item[property]}</td>
                                    })}
                                        <td>
                                        <DropDownActions 
                                            labelButton={<FaIcons.FaEllipsisH />}
                                        >
                                            {actions &&
                                                actions.map( action => {
                                                    return<DropdownItem onClick={() => action.handleAction(item['Id'])}>
                                                        {action.action}
                                                    </DropdownItem>
                                                })
                                            }
                                        </DropDownActions>  
                                    </td>
                                </tr>
                            )
                        })}      
                    </tbody>
                }               
            </Table>
        </>
    )
}
