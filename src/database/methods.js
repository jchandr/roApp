import database from '@react-native-firebase/database';

export const isUserAdmin = userEmail => {
  return new Promise(function (resolve, reject) {
    database()
      .ref('admins')
      .once('value', snapshot => {
        // console.log(snapshot.val());
        return resolve(true);
      });
  });
};
