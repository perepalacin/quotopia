export const isString = (string: string): boolean => {
    return (typeof string === "string") 
}

export const isArrayOfStrings = (array: string[]): boolean => {
    for(var i=0; i<array.length; i++){
        if(typeof array[i] != "string") {
            return false;
        }
    }
    return true;
}