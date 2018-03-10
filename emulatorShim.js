/*
 * Copyright 2018 DoubleDutch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default {
  isEmulated: true,
  openURL(url) { console.log('openURL: ' + url) },
  setTitle() {},
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
    UserName: 'jean@valjean.com',
    EmailAddress: 'jean@valjean.com',
    UserIdentifierId: 'jvj24601',
    FirstName: 'Jean',
    LastName: 'Valjean',
    Title: 'Character',
    Company: 'Les Misérables',
    Tier: 123,
    UserGroups: [68],
  },
  configuration: {
    Settings: [
      { Name: 'RegistrationEnabled', Value: 'False' }
    ],
    UpdateObjects: [],
    Grid: []
  },
  primaryColor: '#009acd',
  apiRootURL: 'https://api.doubledutch.me/v2',
  requestAccessToken(callback) {
    callback(null, 'fake-access-token')
  }
}
