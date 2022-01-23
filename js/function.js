
/**
 * Data Send
 * @param {*} key 
 * @param {*} dev 
 */
function data_send(key, dev){
    let data = JSON.stringify(dev);
    localStorage.setItem(key, data)}

/**
 * Data Get From local Storage
 * @param {*} key 
 * @returns 
 */
function data_get(key){
    let l_data = localStorage.getItem(key);
    return l_data ? JSON.parse(l_data) : l_data;
}

