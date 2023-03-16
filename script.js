'use strict';

const steps = document.querySelectorAll('.step-button');
const stepOne = document.getElementById('step-1');
const nextStep = stepOne.querySelector('.next-step');
const stepTwo = document.getElementById('step-2');
const nextStep2 = stepTwo.querySelector('.next-step');
const stepThree = document.getElementById('step-3');
const nextStep3 = stepThree.querySelector('.next-step');
const stepFour = document.getElementById('step-4');
const confirmButton = stepFour.querySelector('.confirm');
const thankYou = document.querySelector('.thank-you');
const goBack = document.querySelectorAll('.back');
const inputs = document.querySelectorAll('input');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('phone-number');
const plans = document.querySelectorAll('.plan');

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

  if (allFilled) {
    stepOne.classList.add('hidden');
    stepTwo.classList.remove('hidden');
  }
}

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

plans.forEach((plan) => {
  plan.addEventListener('click', (e) => {
    document.querySelector('.plan.focus').classList.remove('focus');
    plan.classList.add('focus');
  });
});

nextStep.addEventListener('click', (e) => {
  e.preventDefault();
  confirm([namee, email, number]);

  //   document.querySelector('.step-button.focus').classList.remove('focus');
  // step.classList.add('focus');
});
const nextButton = () => {
  if (!stepTwo.className.includes('hidden')) {
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

nextStep2.addEventListener('click', nextButton);
nextStep3.addEventListener('click', nextButton);
confirmButton.addEventListener('click', nextButton);

const buttons = Array.from(goBack);

buttons.forEach((back) => {
  back.addEventListener('click', previousButton);
});
