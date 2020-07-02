'use strict';

import _ from 'lodash';
import './style.css';
import './style.scss';
import Icon from './random.jpg';

import Data from './data.xml';

import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello');

  // add image
  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  btn.innerHTML = 'Click to output to console';
  btn.onclick = printMe;

  element.appendChild(btn);

  console.log(Data);

  return element;
}

document.body.appendChild(component());