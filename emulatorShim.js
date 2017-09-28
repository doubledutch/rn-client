import { setEmulatorTitle } from './TitleBar'

export default {
  openURL(url) { console.log('openURL: ' + url) },
  setTitle: setEmulatorTitle,
  currentEvent: {
    StartDate: '2017-01-01T00:00:00.000Z',
    EndDate: '2017-01-02T00:00:00.000Z',
    EventId: 'sample-event-id',
    Description: 'Happy New Year',
    Name: 'New Year Kickoff',
    BundleId: 'sample-bundle-id'
  },
  currentUser: {
    UserId: '24601',
    ImageUrl: 'https://images.amcnetworks.com/bbcamerica.com/wp-content/blogs.dir/55/files/2012/12/Hugh-Jackman-Les-Miserables.jpg',
    UserIdentifierId: 'jean@valjean.com',
    FirstName: 'Jean',
    LastName: 'Valjean',
    Title: 'Character',
    Company: 'Les Misérables'
  },
  configuration: {
    Settings: [
      { Name: 'RegistrationEnabled', Value: 'False' }
    ],
    UpdateObjects: [],
    Grid: []
  },
  primaryColor: '#008080',
  apiRootURL: 'https://api.doubledutch.me/v2',
  requestAccessToken(callback) {
    callback(null, 'fake-access-token')
  }
}