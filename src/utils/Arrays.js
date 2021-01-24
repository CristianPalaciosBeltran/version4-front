export const fixSelect = (id ='Id', name='Name', list) => {
    let fixSelect = [];
    if(list?.length > 0){
        fixSelect = list.map(item => {
            return {Id: item[id], Name: item[name]}
        })
    }
    return fixSelect;
}