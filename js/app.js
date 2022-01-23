
const fiverr_counter = document.getElementById('fiverr_counter');
const counting       = document.getElementById ('counting')

fiverr_counter.addEventListener ('submit', function (e) {
    e.preventDefault();

        let date = this.querySelector('input[type = "date"]').value;
        let time = this.querySelector('input[type = "time"]').value;


    setInterval(() => {
        let start_time = new Date();
        let end_time   = new Date(date + ' ' + time);

        let time_diff  = Math.floor(Math.abs(end_time.getTime() - start_time.getTime()));

        let total_sec   = Math.floor(time_diff / 1000);
        let total_min   = Math.floor(total_sec / 60);
        let total_hours = Math.floor (total_min / 60);
        let total_day   = Math.floor (total_hours / 24) 

        let hours   = total_hours - (total_day * 24);
        let minutes = total_min - (total_day * 24 * 60) - (hours * 60);
        let second  = total_sec - (total_day * 24 * 60 * 60) - (hours * 60 * 60 ) - (minutes * 60)

        counting.innerHTML = `${total_day} : ${hours < 10 ? "0"+hours : hours} : ${minutes < 10 ? "0"+minutes : minutes} : ${second < 10 ? "0"+second : second}`

    },1000)
})

// ============== Age Calculation ================

const age_cal = document.getElementById('age_cal')
const age_result = document.getElementById('age_result')


age_cal.addEventListener('submit', function (e) {
    e.preventDefault();

   let birth_date = this.querySelector(".birth_date").value;
   let current_date = this.querySelector(".current_date").value

   let c_date   = new Date(current_date); 
   let b_date = new Date (birth_date)

   let date_dif = Math.floor(Math.abs(c_date.getTime() - b_date.getTime()))

   let t_sec = Math.floor(date_dif / 1000);
   let t_min = Math.floor(t_sec / 60);
   let t_hour = Math.floor(t_min / 60);
   let t_day = Math.floor(t_hour / 24);
   let t_month = Math.floor(t_day / 30);
   let t_year = Math.floor(t_month / 12);


   let month = t_month - (t_year * 12) 
   let day   = Math.abs(t_day - (t_year * 365) - (month * 30))

  document.querySelector('.years').innerHTML = t_year;
  document.querySelector('.months').innerHTML = month;
  document.querySelector('.days').innerHTML = day;
})

// ================= age calculator with leapyear ===============

const months = [31,28,31,30,31,30,31,31,30,31,30,31]

const submit_2 = document.querySelector('.submit');

function ageCal(){

let input_date = document.querySelector('#date_of_birth').value;

let today = new Date();
let date_of_birth = new Date(input_date);

let birthYear, birthMonth, birthDate;
let birthDatails = {
    date  :date_of_birth.getDate(),
    month :date_of_birth.getMonth(),
    year  :date_of_birth.getFullYear()
}

let currentYear = today.getFullYear();
let currentMonth = today.getMonth()+1;
let currentDate = today.getDate();

leapChecker(currentYear);

if (birthDatails.year > currentYear || (birthDatails.month > currentMonth && birthDatails.year > currentYear) || (birthDatails.date == currentDate && birthDatails.month > currentMonth && birthDatails.year > currentYear ) ){
    alert('Not Born Yet')
    displayResult("-","-","-")
    return;
}

birthYear = currentYear - birthDatails.year;

if (currentMonth >= birthDatails.year){
    birthMonth = currentMonth - birthDatails.month;
}else{
    birthYear --;
    birthMonth = 12 + currentMonth - birthDatails.month
}
if( currentDate >= birthDatails.date){
    birthDate = currentDate - birthDatails.date;
}else{
    birthMonth--;
    let days = months[currentMonth - 2];
    birthDate = days + currentDate - birthDatails.date;
    if (birthMonth < 0 ) {
        birthMonth = 11;
        birthYear--;
        
    }    
}
displayResult(birthYear,birthMonth,birthDate)
}

function displayResult(bYear, bMonth, bDate){
    document.querySelector('.y').innerHTML = bYear;
    document.querySelector('.m').innerHTML = bMonth;
    document.querySelector('.d').innerHTML = bDate;
}
function leapChecker(year){
    if(year % 4 ==  0 || (year % 100 ==  0 && year % 400 ==  0)){
        months[1] = 29;
    }else{
        months[1] = 28;
    }
}


// ================= Add Products ================== //
const add_product_btn = document.getElementById('add_product_btn');
const submit = document.getElementById('products_form');
const product_box = document.getElementById('products_add_box');
const close_product = document.getElementById('add_p_close');
const product_items = document.getElementById('product_items');


add_product_btn.addEventListener('click', function() {
product_box.style.display = "block"
})

close_product.addEventListener('click', function () {
product_box.style.display = 'none'
})

submit.addEventListener('submit', function(e) {
e.preventDefault();
let title = this.querySelector('input[name="title"]');
let cat = this.querySelectorAll('input[name="category"]:checked');
let r_price = this.querySelector('input[name="r_price"]');
let s_price = this.querySelector('input[name="s_price"]');
let p_image = this.querySelector('input[name="p_image"]');


let cat_arr = [];
for (let i = 0; i < cat.length; i++) 
{ cat_arr.push(cat[i].value); } 
let product_arr=[]; 
if (data_get("product")) { 
    product_arr = data_get("product"); 
}else{ 
    product_arr=[]; 
}
    
product_arr.push({ 
    p_title : title.value,
    cat : cat_arr, 
    r_price : r_price.value, 
    s_price : s_price.value, 
    p_image : p_image.value }) 

    data_send("product", product_arr) 
    products()
}) 

    products() 

function products(){ 

    let product  = data_get("product"); 
    let products_data = ''; 

    product.map((p_data) => {
    
    let c_list = "";
    p_data.cat.map((c_data) => {
    c_list += '<span> '+ c_data +' </span>,'
    })

    products_data +=`
            <div class="col-md-4">
                <div class="card text-center">
                    <img src="${p_data.p_image}" class="card-img" width="100" height="200" object-fit="cover" alt="">
                    <div class="card-body">
                         ${c_list}
                        <h5 class="text-center">${p_data.p_title}</h5>
                        <div class="price my-2">
                            <span class="regular_price">${p_data.r_price}</span>
                            <span class="sale_price">${p_data.s_price}</span>
                        </div>
                        <button class="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div> `
    })

    product_items.innerHTML = products_data;
    }

 // ================= Add Member ================== //

const member_btn  = document.getElementById('member_btn')
const add_m_close = document.getElementById('add_m_close')
const add_member  = document.getElementById('member_form')
const member_items = document.querySelector('#member-items')

member_btn.addEventListener('click', function() {
    m_add_box.style.display = "block"
})

add_m_close.addEventListener('click', function () {
    m_add_box.style.display = 'none'
})

add_member.addEventListener('submit', function(e) {
    e.preventDefault();

    let name   = this.querySelector('input[name="name"]');
    let desi   = this.querySelector('input[name="desi"]');
    let skills = this.querySelectorAll('input[name="skill"]:checked');
    let gender = this.querySelector('input[name="gender"]:checked');
    let img    = this.querySelector('input[name="img"]');
    let face   = this.querySelector('input[name="face"]');
    let git    = this.querySelector('input[name="git"]');

    let skill_arr = [];
    for (let i = 0; i < skills.length; i++) { 
        skill_arr.push(skills[i].value);
    }


    let dev_arr;

    if(data_get("dev")){
        dev_arr = data_get("dev") 
    }else{
        dev_arr = [];
    }
    dev_arr.push({
        name   : name.value,
        desi   : desi.value,
        skill  : skill_arr,
        gender : gender.value,
        img    : img.value,
        face   : face.value,
        git    : git.value,

    })  
    data_send("dev",dev_arr)
    
    memberOutput()
})

memberOutput()

function memberOutput(){
    let dev_get = data_get("dev");
    let m_data = "";
    
    dev_get.map(dat => {

    let list = '';
    dat.skill.map((lists) => {
    list += '<li class="list-group-item">'+ lists +'</li>'
    })

    m_data +=`
    <div class="col-md-4 my-3">
        <div class="card">
            <img src="${dat.img}" alt="" class="card-img" width="100" height="200" object-fit="cover">
            <div class="card-body">
                <h3 class = "text-center">${dat.name}</h3>
                <h5 class = "text-center">${dat.desi}</h5>
                <hr>
                <h5>Skill</h5>
                <ul class="list-group">
                    ${list}
                </ul>
                <h5>Gender : ${dat.gender}</h5>
                <div class="social-media">
                    <span class="fb"><a href="${dat.face}"><i class="fab fa-facebook-square"></i></a></span>
                    <span class="git"><a href="${dat.git}"><i class="fab fa-github-square"></i></a></span>
                </div>
            </div>
        </div>
    </div>
    `
    })
    
    member_items.innerHTML = m_data;
    
    }
    

