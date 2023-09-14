# Pub-Sub Pattern for Angular

Angular Pub-Sub pattern offers an intuitive and standardized method for embracing the Publish-Subscribe model within Angular applications. Central to this design is its ability to foster decoupled interactions between components through event dispatching and subscriptions. While it's meticulously crafted to integrate seamlessly with the Angular ecosystem, a unique feature of this architecture is its capability to be invoked from outside Angular, leveraging the global `window` object

## Introduction

With the expansion of modern web applications, there's a growing necessity for diverse application parts to interact based on events rather than tight interconnections. This is precisely where the Publish-Subscribe (Pub-Sub) pattern becomes invaluable. Our Angular PubSub system is designed to address this event-driven communication, seamlessly integrating with Angular's change detection through zones and providing a global interface on the `window` object for both internal and external triggers.

![](https://github.com/emrahumut/angular-pubsub-pattern/blob/main/src/assets/gif/gif2.gif)

## Pub-Sub Design Pattern

The Publish-Subscribe pattern, often referred to as Pub-Sub, is a messaging pattern where senders of messages (publishers) do not program the messages to be sent directly to specific receivers (subscribers). Instead, published messages are characterized into classes, without knowledge of which subscribers (if any) there might be. Similarly, subscribers express interest in one or more classes and only receive messages that are of interest, without knowledge of which publishers there are.

This Pub-Sub design in Angular maintains a list of subscribers for each event. When an event is fired, it looks up these subscribers and runs the registered callbacks.

## Goal of the Design

The primary goal of the Angular Pub-Sub system is to provide a robust event-driven architecture. This enables different parts of the application to communicate and react to specific events without being directly interconnected. By exposing a global interface on the `window` object, it also ensures versatility and wider applicability, bridging the gap between Angular and non-Angular scripts.

![](https://github.com/emrahumut/angular-pubsub-pattern/blob/main/src/assets/gif/gif1.gif)

## Usage

### Defining Events

Events are defined in the `events-enum.ts` file. An example is as follows:

```typescript
export enum GlobalEvents {
  PAGE_VIEWED = 'pageViewed',
  USER_LOGIN = 'userLogin',
  BUTTON_CLICKED = 'peekABoo',
}
```

### Firing Events

Events can be fired using the `EventFireHelper` class. This provides a straightforward way to trigger events from anywhere in the codebase. For instance:

```typescript
EventFireHelper.fire(GlobalEvents.PAGE_VIEWED, [
  { pageName: 'Home Page', time: new Date() },
]);
```

### Subscribing to Events
Components can subscribe to events using the global subscribeToAngularEvent function available on the window object:

```typescript
window['subscribeToAngularEvent'](eventName, callbackFunction);
```

The callback function will be executed whenever the specified event is fired.

### Unsubscribing from Events
If a component no longer wishes to be notified of an event, it can unsubscribe using:

```typescript
window['unsubscribeFromAngularEvent'](eventName);
```
