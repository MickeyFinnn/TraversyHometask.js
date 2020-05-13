document.getElementById("trigger").onclick = function () {
    open()
};

function open() {
    document.getElementById("menu").classList.toggle("show");
}


const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

document.querySelector('.time').innerHTML = new Date().toLocaleTimeString();

document.querySelector('.calculator-ajax').addEventListener('click', getCalculatorAjax);
function getCalculatorAjax() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-container').innerHTML = xhr.responseText;

            
            const btnDigits = document.querySelectorAll(".digits button");
btnDigits.forEach((digit) => digit.addEventListener("click", digitPressed));

const display = document.querySelector(".display");
const regex = /[/]/g;

function digitPressed(ev) {
  display.value += ev.target.innerText;
}
const btnOpers = document.querySelectorAll(".opers button");
btnOpers.forEach((opers) => opers.addEventListener("click", opersPressed));

function opersPressed(ev) {
  if (
    display.value.includes("+") === true ||
    display.value.includes("-") === true ||
    display.value.includes("/") === true ||
    display.value.includes("*") === true
  ) {
    display.value = display.value.substring(0, display.value.length - 1);
  }
  display.value += ev.target.innerText;
}


const btnClear = document.querySelector(".clear");
if(btnClear) { 
    btnClear.addEventListener("click", clearPressed);
}
function clearPressed() {
  display.value = "";
}

document.querySelector('.eq').addEventListener('click', calculate);

function calculate() {
    const divisionOperation = display.value.search(regex)
    if (divisionOperation != null && divisionOperation != display.value.length -1 && display.value[divisionOperation + 1] == '0') {
        display.value = 'EROR 404'
    } else {
        display.value = eval(display.value);
    }
}


const btnBack = document.querySelector(".back");
if(btnBack) {
    btnBack.addEventListener("click", backPressed);
}
function backPressed() {
  let exp = display.value;
  display.value = exp.substring(0, exp.length - 1);
}

const btnZero = document.querySelector(".zero");
if(btnZero) {
    btnZero.addEventListener("click", divByZero);
}
function divByZero() {
  if (
    display.value ===
    display.value.substring(0, display.value.length - 2) + "/0"
  ) {
    alert("EROR404");
  }
}


        }
    }
    xhr.open('get', 'calculator.html', true);
    xhr.send();
}


// Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();


const countDownDate = new Date("May 15, 2020 13:37:25").getTime();


const x = setInterval(function() {

  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);