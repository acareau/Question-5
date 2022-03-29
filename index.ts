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
  document.getElementById('slideshow').childNodes.forEach((node: ChildNode) => {
    if (node.nodeType == Node.ELEMENT_NODE) {
      if (links.length) {
        let element: HTMLElement = node as HTMLElement;
        element.classList.add('loading');
        element.style.backgroundImage = "url('" + links.shift() + "')";
        element.classList.remove('loading');
      }
    }
  });
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
  if (button.innerHTML == 'Start') {
    button.innerHTML = 'Stop';
    let urlList = [];
    url$.subscribe((observer) => {
      updateImages(observer[0], observer[1], observer[2], observer[3]);
    });
  } else {
    button.innerHTML = 'Start';
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
