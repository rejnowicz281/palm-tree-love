# palm-tree-love

A simple project to practice working with [Pusher](https://pusher.com/) and [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). Built with NextJS 14.

## Features

-   PWA support ([@ducanh/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa))
-   Send and receive hearts in realtime ([Pusher Channels](https://pusher.com/channels/))
-   Receive notifications when someone sends you a heart ([Pusher Beams](https://pusher.com/beams/))

## Sending hearts

-   Click on the big heart to make floating hearts appear in all connected clients as well as send a notification to the receiver.
-   On successful notification and heart broadcast, the heart will pulsate.
-   On error, the heart will shake.

## PWA support

You can install the app on your device by clicking on the install button in the address bar. The app will be then installed as a standalone app and you will be able to launch it from your home screen.
