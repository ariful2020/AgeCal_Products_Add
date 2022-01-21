
/**
 * Data storage localstorage
 * @param {*} key 
 * @param {*} arr 
 * @returns 
 */

function dataSend (key, arr){

    let data = JSON.stringify(arr)
    localStorage.setItem(key, data)
    return true;
}

/**
 * data get from localstorage
 * @param {*} key 
 * @returns 
 */
function getData (key){
    let data = localStorage.getItem(key);
    return JSON.parse(data)
}
















// function dataSend (key , arr){

//     let data = JSON.stringify(arr);
//     localStorage.setItem(key , data)
//     // return true;
// }

// function dataGet(arr){
//      let data_2 = localStorage.getItem(arr);
//      return JSON.parse(data_2)
// }