import database from '@react-native-firebase/database';

export const isUserAdmin = async function (userEmail) {
  return new Promise(function (resolve, reject) {
    database()
      .ref('users/admins/')
      .orderByChild('email')
      .startAt(userEmail)
      .on('value', snapshot => {
        snapshot = snapshot.val();
        for (var i = 0; i < snapshot.length; i++) {
          if (snapshot[i] !== null && snapshot[i].email === userEmail) {
            return resolve(true);
          }
        }
        return resolve(false);
      });
  });
};

export const getCustomers = (pageSize, startFrom = '') => {
  return new Promise(function (resolve, reject) {
    database()
      .ref('/customer/details/')
      .orderByChild('entryDate')
      .limitToFirst(pageSize)
      .startAt(startFrom)
      .on('value', snapshot => {
        return resolve(snapshot.val());
      });
  });
};

export const getCustomerById = id => {
  return new Promise(function (resolve, reject) {
    database()
      .ref(`/customer/details/${id}`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        return resolve(snapshot.val());
      });
  });
};
