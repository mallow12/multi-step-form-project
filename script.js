'use strict';

const steps = document.querySelectorAll('.step-button');
const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');
const stepFour = document.getElementById('step-4');
const inputs = document.querySelectorAll('input');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('phone-number');

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

steps.forEach((step) => {
  step.addEventListener('click', (e) => {
    if (step.className.includes('one')) {
      stepOne.classList.remove('hidden');
      stepTwo.classList.add('hidden');
      stepThree.classList.add('hidden');
      stepFour.classList.add('hidden');
    } else if (step.className.includes('two')) {
      stepOne.classList.add('hidden');
      stepThree.classList.add('hidden');
      stepFour.classList.add('hidden');
      stepTwo.classList.remove('hidden');
    } else if (step.className.includes('three')) {
      stepOne.classList.add('hidden');
      stepTwo.classList.add('hidden');
      stepFour.classList.add('hidden');
      stepThree.classList.remove('hidden');
    } else {
      stepOne.classList.add('hidden');
      stepTwo.classList.add('hidden');
      stepThree.classList.add('hidden');
      stepFour.classList.remove('hidden');
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();

    checkRequired([namee, email, number]);
    checkValidity(email);
    nameFormat(namee);
    numberFormat(number)
  });
});
