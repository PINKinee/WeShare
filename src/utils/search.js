export const updateFolder = (id, arr, children) => {
    arr.forEach(item => {
        if (item.id === id) {
            item.children = children;
        } else {
            return updateFolder(item.children);
        }
    })
}