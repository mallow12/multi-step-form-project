# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./assets/images/Screenshot%202023-03-22%20at%2014-02-28%20Frontend%20Mentor%20Multi-step%20form.png)
![](./assets/images/Screenshot%202023-03-22%20at%2014-04-49%20Frontend%20Mentor%20Multi-step%20form.png)

### Links

- Solution URL: [solution](https://github.com/mallow12/multi-step-form-project)
- Live Site URL: [Live site](https://abdullah-multi-step-form.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla js

### What I learned

I learn a lot in this project

To see how you can add code snippets, see below:

```js
electedAddOns.forEach((addOns) => {
  const check = addOns.querySelector('input');
  check.checked = false;
  addOns.addEventListener('click', (e) => {
    let name = addOns.querySelector('h2');
    name = name.innerText;
    let amount = addOns.querySelector('.amountx');
    amount = amount.innerText;
    const summarySec = generateSummaryDom(name, amount);
    if (!addOns.classList.contains('focus')) {
      check.checked = true;
      addOns.classList.add('focus');
      summaryMainChild.appendChild(summarySec);
      addOns.summarySec = summarySec;
    } else {
      check.checked = false;
      addOns.classList.remove('focus');

      const summaryElements = summaryMainChild.querySelectorAll('.summary-child');
      summaryElements.forEach((summaryElement) => {
        const summaryName = summaryElement.querySelector('p').innerText;
        if (summaryName === name) {
          summaryMainChild.removeChild(summaryElement);
        }
      });
    }
    updateTotal();
  });
});
```

### Continued development
I would love to improve my multipage website implementations.


## Author

- Frontend Mentor - [@mallow12](https://www.frontendmentor.io/profile/mallow12)

