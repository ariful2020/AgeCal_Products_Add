
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

   console.log(t_day);

})

// ================= Add Products ==================
const add_product_btn = document.getElementById('add_product_btn')
const submit          = document.getElementById('products_form')
const product_box     = document.getElementById('products_add_box')
const close_product   = document.getElementById('add_p_close')

add_product_btn.addEventListener('click', function() {
    product_box.style.display = "block"
})

close_product.addEventListener('click', function () {
    product_box.style.display = 'none'
})

submit.addEventListener('submit', function(e) {
    e.preventDefault()
})

const p_list = document.querySelector(".p_list")

const allProducts = [
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://dekorabd.com/image/cache/catalog/dekora/Product/T-Shirt/White/BTS-member-White-T-shirt-800x800.jpg.webp"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://cdn.shopify.com/s/files/1/0564/4081/5810/products/BLACK1.1_1ff996f3-9492-4582-a905-ed3ced9ecaf2_250x250@2x.png?v=1638696983"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://dekorabd.com/image/cache/catalog/dekora/Product/T-Shirt/White/BTS-member-White-T-shirt-800x800.jpg.webp"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://cdn.shopify.com/s/files/1/0564/4081/5810/products/BLACK1.1_1ff996f3-9492-4582-a905-ed3ced9ecaf2_250x250@2x.png?v=1638696983"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://dekorabd.com/image/cache/catalog/dekora/Product/T-Shirt/White/BTS-member-White-T-shirt-800x800.jpg.webp"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://cdn.shopify.com/s/files/1/0564/4081/5810/products/BLACK1.1_1ff996f3-9492-4582-a905-ed3ced9ecaf2_250x250@2x.png?v=1638696983"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://dekorabd.com/image/cache/catalog/dekora/Product/T-Shirt/White/BTS-member-White-T-shirt-800x800.jpg.webp"
    },
    {
        name  : "T-Shirt",
        price : 200,
        sale  : 180,
        image : "https://cdn.shopify.com/s/files/1/0564/4081/5810/products/BLACK1.1_1ff996f3-9492-4582-a905-ed3ced9ecaf2_250x250@2x.png?v=1638696983"
    },

    ]
    


    let dataSet = dataSend ("Products" , allProducts)

    let dataGet = getData ("Products")

    

   dataGet.map((data) => {
        p_list.innerHTML +=`
        <div class="col-md-3 product_items my-3">
        <div class="card text-center">
            <img src="${data.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5>${data.name}</h5>
                <p>
                    <span class="regular_price">${data.price}</span>
                    <span class="sale_price">${data.sale}</span>
                </p>
                <button class="btn btn-success" id="add_to_card">Add To Cart</button>
            </div>
        </div>
    </div>
        `
    })

 // ================= Add Member ================== //

const member_btn = document.getElementById('member_btn')
const add_member          = document.getElementById('member_form')
const m_add_box     = document.getElementById('m_add_box')
const add_m_close   = document.getElementById('add_m_close')

member_btn.addEventListener('click', function() {
    m_add_box.style.display = "block"
})

add_m_close.addEventListener('click', function () {
    m_add_box.style.display = 'none'
})

add_member.addEventListener('submit', function(e) {
    e.preventDefault()
})
   const member_items = document.querySelector('.member-items')

const allMember = [
    {
        name  : "Asraful Haque",
        Desi : "Instructor",
        skill  : "JavaScript",
        image : "https://cdn.powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png",
        f_link : "",
        g_link : ""
    },
    {
        name  : "Rekha Roy",
        Desi : "Instructor",
        skill  : "Mern Stack",
        image : "https://www.team.gsamdani.com/wp-content/uploads/2016/05/tm9.jpg",
        f_link : "",
        g_link : ""
    },
    {
        name  : "Rubel Hasan",
        Desi : "Instructor",
        skill  : "PHP",
        image : "https://cdn.powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png",
        f_link : "",
        g_link : ""
    },
    {
        name  : "Sanzida Khan",
        Desi : "Instructor",
        skill  : "Phython",
        image : "https://www.team.gsamdani.com/wp-content/uploads/2016/05/tm9.jpg",
        f_link : "",
        g_link : ""
    }
    
    ]

    let m_data_send = dataSend ("Member", allMember)

    let m_data_get = getData("Member")

    m_data_get.map((data) => {
        member_items.innerHTML +=`
        <div class="col-md-3 member_items my-3">
                <div class="card text-center">
                    <img src = "${data.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h4 class="m_name">${data.name}</h4>
                        <h5 class="designation">${data.Desi}</h5>
                        <h6 class="skill">${data.skill}</h6>
                        <div class="social_media">
                            <a href="${data.f_link}" class="facebook"><i class="fab fa-facebook-square"></i></a>
                            <a href="${data.g_link}" class="github"><i class="fab fa-github-square"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `
    })




// age calculator

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