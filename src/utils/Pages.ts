export const getPageCount = (totalCount, pageSize) => {
    return Math.ceil(totalCount / pageSize);
}

export const getPagesArray = (totalPages:number):number[] =>{
    let result:number[] = [];
    for(let i = 0; i<totalPages;i++){
        result.push(i+1);
    }
    return result;
}