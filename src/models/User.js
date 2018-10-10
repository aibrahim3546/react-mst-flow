import { types } from 'mobx-state-tree';

const User = types
  .model('User', {
    key: types.optional(types.identifier(types.string), ''),
    email: '',
    name: '',
    gender: '',
    phoneNumber: types.optional(types.string, ''),
    avatarUrl: types.optional(types.string, ''),
    state: types.optional(types.string, ''),
    city: types.optional(types.string, ''),
    birthDate: types.maybe(types.string),
    countryCode: '60',
    hasRegister: false,
    isConnected: false,
    imageVersion: '',
    nric: types.optional(types.string, ''),
    geoLocation: types.optional(GeoLocation, {}),
    wallet: types.optional(types.string, ''),
  })


export default User;