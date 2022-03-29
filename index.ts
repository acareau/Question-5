import './style.css';

import { fromEvent, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

function updateImages(
  link0: string,
  link1: string,
  link2: string,
  link3: string
): void {
  let links: string[] = [link0, link1, link2, link3];
  document.getElementById('slideshow').classList.add('loading');
  document.getElementById('slideshow').childNodes.forEach((node: ChildNode) => {
    if (node.nodeType == Node.ELEMENT_NODE) {
      if (links.length) {
        let element: HTMLElement = node as HTMLElement;
        //element.classList.add('loading');
        element.style.backgroundImage = "url('" + links.shift() + "')";
        //element.classList.remove('loading');
      }
    }
  });
  document.getElementById('slideshow').classList.remove('loading');
}
/*
 * This API endpoint returns a JSON message of the following format:
 * {
 * "status": "success",
 * "message": "<url of a random image>"
 * }
 */
const apiUrl: string = 'https://dog.ceo/api/breeds/image/random';

const button = document.querySelector('button');

const btn$ = fromEvent(button, 'click').subscribe((observer) => {
  let subscription;
  if (button.innerHTML == 'Start') {
    button.innerHTML = 'Stop';
    subscription = setInterval(() => {
      url$.subscribe((observer) => {
        console.log('New Images');
        updateImages(observer[0], observer[1], observer[2], observer[3]);
      });
    }, 5000);
  } else {
    button.innerHTML = 'Start';
    clearInterval(subscription);
  }
});

const url$ = fromPromise(
  Promise.all([
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => response.message),
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => response.message),
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => response.message),
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => response.message),
  ])
);
