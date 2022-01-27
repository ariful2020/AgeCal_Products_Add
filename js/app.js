
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

let currentYear  = today.getFullYear();
let currentMonth = today.getMonth()+1;
let currentDate  = today.getDate();

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

// const add_product_btn = document.getElementById('add_product_btn');
const add_product_btn = document.getElementById('add_product_btn');
const add_product_box = document.getElementById('add_product_box');
const btn_close       = document.getElementById('btn-close');
const apply           = document.getElementById('apply');
const products_output = document.getElementById('products_output');

add_product_btn.addEventListener('click',function() {
    add_product_box.style.transform="scaleY(1)"
});
btn_close.addEventListener('click',function() {
    add_product_box.style.transform="scaleY(0)";
});

apply.addEventListener('submit', function(e) {

    e.preventDefault();
   let title  = this.querySelector('input[name="title"]').value;
   let img    = this.querySelector('input[name="img"]').value;
   let desc   = this.querySelector('textarea[name="desc"]').value;
   let cat    = document.querySelectorAll('input[name="cate"]:checked');
   let rPrice = this.querySelector('input[name="rPrice"]').value;
   let sPrice = this.querySelector('input[name="sPrice"]').value;

   
   let rp;
   let sp;

   if (sPrice == ''){
    rp = `${rPrice}$`;
   }else{
    rp =`<del class="del_price">${rPrice}$</del>`;
   }


   if (sPrice == ''){
    sp = `<span style="display:none">${sPrice}$</span>`
   }else{
    sp = `<span>${sPrice}$</span>`
   }




   let cat_arr=[];

   for (let i = 0; i < cat.length; i++) {
       cat_arr.push(cat[i].value)}
       

    let products_arr;
    if(dataGet("product")){
        products_arr = dataGet("product"); 
    }else{
        products_arr = [];
    }

products_arr.push({
        title  : title,
        img    : img,
        desc   : desc,
        cat    : cat_arr,
        rPrice : rp,
        sPrice : sp
})
   
    if (rPrice == '') {
        dataSend("Not", products_arr);   
    }else {
        dataSend("product", products_arr);
    }

    if (rPrice == '') {
        alert ('Please Input Your Regular Price')    
    }else{
        product_grid()
    }

  
})

product_grid()
function product_grid(){
    let prodGet = dataGet("product");
    let prod_grid= '';
    
    prodGet.map(data => {
    
    let cat_show = '';
    
    data.cat.map((cat_data) => {
    cat_show += `<span class="cat"> ${cat_data}</span>`
    })
    prod_grid +=`
   
        <div class="col-md-4 mb-3" id="list_items">
        <div id="list_grid">
            <div class="card text-center product-item">
                <div class="card-body">
                    <div id="list_left">
                        <div class="wishlist-addCard text-success">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-cart-plus"></i>
                        </div>
                        <img class="card-img" object-fit="cover" width="200" height="150" src="${data.img}" alt="">
                    </div>
                    <div id="list_right">
                        <h6 class="mt-4">${cat_show}</h6>
                        <h3>${data.title}</h3>
                        <div class="price">
                            <span class="r_price">${data.rPrice}</span>
                            <span class="s_price">${data.sPrice}</span>
                        </div>
                        <button class="btn btn-success mt-2">Add To Card</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    })
    
    products_output.innerHTML = prod_grid;
    
    }
    
const list       = document.getElementById('list');
const grid       = document.getElementById('grid');
const list_grid  = document.getElementById('list-grid');
const list_left  = document.getElementById('list-left');
const list_right = document.getElementById('list_right');


list.addEventListener('click', function(){
    list_grid.classList.add("row")
    list_left.classList.add("col-md-4")
    list_right.classList.add("col-md-8")
})
grid.addEventListener('click', function(){
    list_grid.classList.remove("row")
    list_left.classList.remove("col-md-4")
    list_right.classList.remove("col-md-8")
})



 // ================= Add Member ================== //

const member_btn  = document.getElementById('member_btn')
const add_m_close = document.getElementById('add_m_close')
const add_member  = document.getElementById('member_form')
const member_items = document.querySelector('#member-items')

member_btn.addEventListener('click', function() {
    m_add_box.style.transform="scaleY(1)"
})

add_m_close.addEventListener('click', function () {
    m_add_box.style.transform="scaleY(0)"
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

    if(dataGet("dev")){
        dev_arr = dataGet("dev") 
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
    dataSend("dev",dev_arr)
    
    memberOutput()
})

memberOutput()

function memberOutput(){

    let devGet = dataGet("dev");
    let m_data  = "";
    
    devGet.map(dat => {

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
                    <span class="fb"><a href="${dat.face}"><i class="fab fa-facebook-square text-success"></i></a></span>
                    <span class="git"><a href="${dat.git}"><i class="fab fa-github-square text-success"></i></a></span>
                </div>
            </div>
        </div>
    </div>
    `
    })
    
    member_items.innerHTML = m_data;
    
    }
    

