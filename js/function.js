
/**
 * Data Send
 * @param {*} key 
 * @param {*} dev 
 */
// function data_send(key, dev){
//     let data = JSON.stringify(dev);
//     localStorage.setItem(key, data)}

/**
 * Data Get From local Storage
 * @param {*} key 
 * @returns 
 */

// function data_get(key){
//     let l_data = localStorage.getItem(key);
//     return l_data ? JSON.parse(l_data) : l_data;
// }




function dataSend(key, products){
    let send_data = JSON.stringify(products);
    localStorage.setItem(key,send_data);
}

function dataGet(key){
    let prod_get = localStorage.getItem(key);

    return JSON.parse(prod_get)

}