export const checkEmail = email => {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
}
export const judgePsw = (a, b) => a === b;

export const dataHandler = (arr1, arr2) => {
    const array1 = arr1.filter(item => item !== null);
    const array2 = arr2.filter(item => item !== null);
    if (array1.length && array2.length) {
        return [...array1, ...array2];
    } else if (array1.length && !array2.length) {
        return [...array1];
    } else if (array2.length && !array1.length) {
        return [...array2];
    } else {
        return [];
    }
}

export const clearEmptyData = arr => {
    return arr.length === 0 ? arr : arr.filter(item => item !== null);
}