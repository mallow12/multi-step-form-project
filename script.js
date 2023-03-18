'use strict';

const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');
const stepFour = document.getElementById('step-4');
const thankYou = document.querySelector('.thank-you');
const inputs = document.querySelectorAll('input');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('phone-number');
const mainPlan = document.querySelector('.plans');
const switcher = document.querySelector('.switcher');
const addOns = document.querySelector('.add-ons');
const toggle = document.querySelector('.toggle');
const change = document.querySelector('.change');
const mainSummary = document.querySelector('.summary-main');
const summaryTotal = document.querySelector('.summary-total');
const summaryTitle = document.querySelector('.summary-title');
const summaryMainAmount = document.querySelector('.summary-main-amount');

function doSomethingForEachElement(selector, func) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(func);
}

// focus();

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, 'This field is required');
    } else {
      showSuccess(input);
    }
  });
}

function checkValidity(input) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function nameFormat(input) {
  const words = input.value.trim().split(/\s+/);

  if (words.length === 1) {
    showError(input, 'Invalid name');
  } else if (/\d/.test(input.value)) {
    showError(input, 'Wrong format, letters only');
  } else {
    showSuccess(input);
  }
}

function numberFormat(input) {
  const inputValue = input.value;

  if (/[a-zA-Z]/.test(inputValue)) {
    showError(input, 'Wrong format, numbers only');
  } else if (inputValue.length < 3) {
    showError(input, 'Minimum 3 characters');
  } else {
    showSuccess(input);
  }
}

function confirm(inputss) {
  let allFilled = true;
  inputss.forEach((input) => {
    const formControl = input.parentElement;
    if (input.value === '') {
      formControl.classList.add('error');
      allFilled = false;
    } else if (formControl.className.includes('error')) {
      allFilled = false;
    } else {
      formControl.classList.remove('error');
    }
  });

  return allFilled;
}

function updateToggle() {
  const selectedPlan= document.querySelector('.plan.focus')
  if (switcher.className.includes('month')) {
    const selectedMonth = selectedPlan.querySelector('.month');
    summaryMainAmount.innerText = selectedMonth.innerText;
  } else {
    const selectedYear = selectedPlan.querySelector('.year');
    summaryMainAmount.innerText = selectedYear.innerText;
  }
}

function mnyrSwitch() {
  if (switcher.className.includes('month')) {
    switcher.className = 'switcher year';
    mainPlan.className = 'plans yearly';
    addOns.className = 'add-ons yearly';
    mainSummary.className = 'summary-main yearly';
    summaryTotal.className = 'summary-total yearly';
  } else {
    switcher.className = 'switcher month';
    mainPlan.className = 'plans monthly';
    addOns.className = 'add-ons yearly';
    mainSummary.className = 'summary-main monthly';
    summaryTotal.className = 'summary-total monthly';
  }
}
const nextStep = Array.from(document.querySelectorAll('.next-step'));

const stepButtons = Array.from(document.querySelectorAll('.step-button'));

const buttons = Array.from(document.querySelectorAll('.back'));

let currentStep = 1;

const nextButton = () => {
  if (!stepOne.className.includes('hidden')) {
    if (confirm([namee, email, number])) {
      stepOne.classList.add('hidden');
      stepTwo.classList.remove('hidden');
    }
  } else if (!stepTwo.className.includes('hidden')) {
    stepTwo.classList.add('hidden');
    stepThree.classList.remove('hidden');
  } else if (!stepThree.className.includes('hidden')) {
    stepThree.classList.add('hidden');
    stepFour.classList.remove('hidden');
  } else {
    stepFour.classList.add('hidden');
    thankYou.classList.remove('hidden');
  }
};

const previousButton = () => {
  if (!stepTwo.className.includes('hidden')) {
    stepOne.classList.remove('hidden');
    stepTwo.classList.add('hidden');
  } else if (!stepThree.className.includes('hidden')) {
    stepTwo.classList.remove('hidden');
    stepThree.classList.add('hidden');
  } else {
    stepThree.classList.remove('hidden');
    stepFour.classList.add('hidden');
  }
};

const changeButton = () => {
  if (!stepFour.className.includes('hidden')) {
    stepTwo.classList.remove('hidden');
    stepFour.classList.add('hidden');
  }
};
// document.querySelector('.step-button.focus').classList.remove('focus');
// step.classList.add('focus');

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();

    checkRequired([namee, email, number]);
    checkValidity(email);
    nameFormat(namee);
    numberFormat(number);
  });
});

const plans = Array.from(document.querySelectorAll('.plan'));

plans.forEach((plan) => {
  plan.addEventListener('click', (e) => {
    document.querySelector('.plan.focus').classList.remove('focus');
    plan.classList.add('focus');
    const name = plan.querySelector('h2');
    const month = plan.querySelector('.month');
    const yearss = plan.querySelector('.year');
    summaryTitle.innerText = name.innerText;

    if (switcher.className.includes('month')) {
      summaryMainAmount.innerText = month.innerText;
    } else {
      summaryMainAmount.innerText = yearss.innerText;
    }
  });
});

//   document.querySelector('.step-button.focus').classList.remove('focus');
// step.classList.add('focus'););

nextStep.forEach((button) => {
  button.addEventListener('click', () => {
    const allFilled = confirm([namee, email, number]);
    if (allFilled) {
      nextButton();
      stepButtons[currentStep - 1].classList.remove('focus');
      currentStep++;
      stepButtons[currentStep - 1].classList.add('focus');
    }
  });
});

let okay = true;
buttons.forEach((back) => {
  back.addEventListener('click', () => {
    if (okay) {
      previousButton();
      stepButtons[currentStep - 1].classList.remove('focus');
      currentStep--;
      stepButtons[currentStep - 1].classList.add('focus');
    }
  });
});

toggle.addEventListener('click',() => {
  mnyrSwitch()
  updateToggle()
});

change.addEventListener('click', () => {
  if (okay) {
    changeButton();
    stepButtons[currentStep - 1].classList.remove('focus');
    currentStep = currentStep - 2;
    stepButtons[currentStep - 1].classList.add('focus');
  }
});
