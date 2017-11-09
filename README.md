@doubledutch/rn-client
======================

DoubleDutch client library for building custom extensions with React Native

# Automated setup

The easiest way to get started is to install the [DoubleDutch command line tool](https://github.com/doubledutch/cli) and run `doubledutch init`.

See also [@doubledutch/firebase-connector](https://github.com/doubledutch/firebase-connector)
for an easy backend for your DoubleDutch extension.

![Screenshot of sample DoubleDutch extension using rn-client](https://github.com/doubledutch/rn-client/raw/master/samples/rn-sample.png)

# Usage

```jsx
import client, { TitleBar, Avatar } from '@doubledutch/rn-client'

console.log(client.currentUser)
console.log(client.currentEvent)
console.log(client.primaryColor)

client.getToken().then(token => console.log(`${token} is a valid DoubleDutch access token, usually used indirectly by other client libraries.`))

class HomeView extends ReactNative.Component {
  render() {
    <View>
      <TitleBar client={client} title={`Hello ${client.currentUser.FirstName}`} />
      <Avatar user={client.currentUser} size={40} />
    </View>
  }
}
```

# Documentation

## `client.currentUser`

Provides information about the current attendee.

```javascript
{
  id: '24601',                            // DoubleDutch user ID (required)
  image: 'https://ddut.ch/image.jpg',     // Avatar image URL (optional)
  identifier: 'jean@valjean.com',         // Unique ID provided by event organizer (required)
  firstName: 'Jean',                      // Given name (required)
  lastName: 'Valjean',                    // Surname (required)
  title: 'Character',                     // Job title (optional)
  company: 'Les Misérables'               // Company attendee works for (optional)
}
```

## `client.currentEvent`

Provides information about the current event.

```javascript
{
  startDate: '2017-01-01T00:00:00.000Z',  // First day of event
  endDate: '2017-01-02T00:00:00.000Z',    // Last day of event
  id: 'sample-event-id',             // Event ID provided by DoubleDutch (required)
  description: 'Happy New Year',          // Description of the event (optional)
  name: 'New Year Kickoff',               // Name of the event (required)
  appId: 'sample-app-id'                  // ID of the parent app that contains this event
}
```

## `client.primaryColor`

Primary color used in the event app, to match event branding.

```javascript
'#009acd'
```

`client.secondaryColor` and `client.tertiaryColor` are also automatically
generated based on this `primaryColor`, designed to be pleasing complements when
other branded colors are desired.

### `Color`
If additional branded colors are desired, a `Color` class is exported with some
useful tranformations available, e.g.

```javascript
new Color(client.primaryColor).shiftHue(1/2).limitLightness(0.8).rgbString()
```

## `client.getToken`

Returns a Promise which resolves to a valid access token.  Normally used
indirectly by other client libraries to access the DoubleDutch platform.

```javascript
client.getToken().then(token => /* Use the token. */)
```

## `TitleBar`

React Native component useful for interacting with the title bar that is native
to DoubleDutch apps.

In the simulator, a title bar will be rendered as React Native components. In a
native DoubleDutch iOS or Android app, the native app provides the title bar.
`<TitleBar />` abstracts away these differences to provide a simulated
experience that matches a real DoubleDutch app.

```jsx
<TitleBar client={client} title="Extension title" signin={this.signin} />
```

### Props

- `client`. The client imported from `@doubledutch/rn-client`. Required for
  setting the native `title` text in a DoubleDutch app.
- `title`. The desired text of the native title bar. Requires `client` prop to
  be set.
- `signin`. (Optional) Promise that will resolve when signin to a backend is
  complete.  If specified, the title bar will show connection status while 
  authenticating to your backend.  E.g. if using
  [@doubledutch/firebase-connector](https://github.com/doubledutch/firebase-connector),
  this can be the Promise returned by `fbc.signin()`.

## `Avatar`

React Native component that shows a circular avatar image of an attendee, or
his/her initials if no image is available.

```jsx
<Avatar user={user} size={25} />
```

### Props

- `user`. The attendee whose avatar should be displayed. This can be
  `client.currentUser` to display the avatar of the attendee currently viewing
  the app, or another attendee object.
- `size`. The diameter of the avatar image.
