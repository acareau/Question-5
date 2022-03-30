import './style.css';

import { fromEvent, Observable } from 'rxjs';
//import { fromPromise } from 'rxjs/internal/observable/innerFrom';

function updateImages(linkList): void {
  document.getElementById('slideshow').childNodes.forEach((node: ChildNode) => {
    if (node.nodeType == Node.ELEMENT_NODE) {
      if (linkList.length) {
        let element: HTMLElement = node as HTMLElement;
        element.classList.add('loading');
        element.style.backgroundImage = "url('" + linkList.shift() + "')";
        setTimeout(() => element.classList.remove('loading'), 600);
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

let subscription;
const btn$ = fromEvent(button, 'click').subscribe((observer) => {
  if (button.innerHTML == 'Start') {
    button.innerHTML = 'Stop';
    subscription = url$.subscribe((observer) => {
      updateImages(observer);
    });
  } else {
    button.innerHTML = 'Start';
    subscription.unsubscribe();
  }
});

const url$ = new Observable(function subscribe(subscriber) {
  const callSequence = setInterval(() => {
    let urlList = [];
    for (let i = 0; i < 4; i++) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((response) => response.message)
        .then((response) => {
          urlList.push(response);
          if (urlList.length == 4) subscriber.next(urlList);
        });
    }
  }, 5000);
  return function unsubscribe() {
    clearInterval(callSequence);
  };
});
