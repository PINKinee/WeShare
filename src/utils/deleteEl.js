export default (arr, aimId, prop) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][prop] === aimId) {
            arr.splice(i, 1);
            i--;
        }
    }
}
