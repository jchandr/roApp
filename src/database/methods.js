import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const generatePassword = () => {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const generateOtp = () => {
  var digits = '0123456789';
  let OTP = '';
  var otpLength = 4;
  for (let i = 0; i < otpLength; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const createDistributorAccount = (name, email, phone, address) => {
  // const password = generatePassword();
  // we will now use a default password Qwerty@123 as a default password
  // but in later stages, we need to generate a random password and send it to the email ID.
  // shold ask the user to reset the password
  const password = 'Qwerty@123';
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(x => {
        resolve(x.user);
        const userId = x.user.uid;

        database()
          .ref(`users/distributors/${userId}/detail`)
          .set({
            name: name,
            email: email,
            phone: phone,
            address: address,
            customersCount: 0,
          })
          .then(() => {
            database()
              .ref('users/distributors/detail')
              .set({
                distributorsCount: database.ServerValue.increment(1),
              });
            resolve();
          });
      })
      .catch(() => {
        reject();
      });
  });
};

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

export const getCustomers = pageSize => {
  const currentUser = auth().currentUser.uid;
  return new Promise(function (resolve, reject) {
    database()
      .ref(`/users/distributors/${currentUser}/customers`)
      .orderByChild('installationDate')
      .on('value', snapshot => {
        if (snapshot === null) {
          return reject();
        }
        return resolve(snapshot.val());
      });
  });
};

export const getAds = () => {
  return new Promise(function (resolve, reject) {
    database()
      .ref('/ads/')
      .on('value', snapshot => {
        return resolve(snapshot.val());
      });
  });
};

export const getCustomerById = id => {
  const currentUser = auth().currentUser.uid;
  return new Promise(function (resolve, reject) {
    database()
      .ref(`/users/distributors/${currentUser}/customers/${id}`)
      .on('value', snapshot => {
        return resolve(snapshot.val());
      });
  });
};

export const updateCustomerInfo = (documentId, data) => {
  const currentUser = auth().currentUser.uid;
  return new Promise(function (resolve, reject) {
    database()
      .ref(`/users/distributors/${currentUser}/customers/${documentId}`)
      .update(data)
      .then(() => resolve());
  });
};

export const createServicesEntry = (
  serviceDuration,
  installationDate,
  customerDocId,
) => {
  const currentUser = auth().currentUser.uid;
  for (let index = 1; index <= serviceDuration; index++) {
    var nextMonthDate = new Date(installationDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + index);
    const toPush = {
      customerDocId: customerDocId,
      currentServiceMonthCount: index,
      serviceDuration: serviceDuration,
      satisfiedOtp: generateOtp(),
      unsatisfiedOtp: generateOtp(),
      serviceDueDate: nextMonthDate.getTime(),
      isClosed: false,
      closeType: '',
      closedAt: '',
      createdAt: database.ServerValue.TIMESTAMP,
    };
    database().ref(`users/distributors/${currentUser}/services/`).push(toPush);
  }
};

export const getServices = (startAt = null) => {
  const currentUser = auth().currentUser.uid;

  return new Promise((resolve, reject) => {
    database()
      .ref(`users/distributors/${currentUser}/services/`)
      .orderByChild('serviceDueDate')
      .on('value', snapshot => {
        if (snapshot === null) {
          return reject();
        }
        return resolve(snapshot.val());
      });
  });
};

export const createCustomerRecord = (uid, data) => {
  const currentUser = auth().currentUser.uid;

  return new Promise((resolve, reject) => {
    database()
      .ref(`users/distributors/${currentUser}/detail`)
      .once('value', snapshot => {
        const val = snapshot.val();

        const newData = {
          ...data,
          customerId: val.customersCount + 1,
        };
        database()
          .ref(`users/distributors/${currentUser}/customers/`)
          .push(newData)
          .then(snap => {
            createServicesEntry(
              data.serviceDuration,
              data.installationDate,
              snap.key,
            );

            resolve();
            database()
              .ref(`users/distributors/${currentUser}/detail`)
              .set({
                customersCount: database.ServerValue.increment(1),
              });
          });
      });
  });
};
