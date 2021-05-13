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

export const getCustomers = (pageSize, startFrom = 0) => {
  return new Promise(function (resolve, reject) {
    database()
      .ref('/customer/details/')
      .orderByValue()
      .limitToFirst(pageSize)
      .on('value', snapshot => {
        return resolve(snapshot.val());
      });
  });
};
