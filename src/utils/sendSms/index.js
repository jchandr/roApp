var axios = require('axios');

export const sendWelcomeMessage = (
  brandName,
  distName,
  custId,
  distNumber,
  customerMobileNumber,
) => {
  const axioxConfig = {
    method: 'GET',
    params: {
      apiKey: 'NmQ3ODcxNjM0ZDY5NjU3MDM5NjU2ZDU0NDQ0YjUwMzU=', //Text local api key
      sender: 'SRVSRO',
      numbers: `${customerMobileNumber}`,
      message: `Hello customer, Thanks for purchasing ${brandName} from ${distName}. Your customer ID is ${custId}. For further details please call ${distNumber}.HYDROCARE.`,
    },
    url: 'https://api.textlocal.in/send/',
  };

  return new Promise((resolve, reject) => {
    axios(axioxConfig)
      .then(x => resolve(x.data))
      .catch(x => reject(x.data));
  });
};

export const sendOtp = (
  otp,
  customerMobileNumber,
  distNumber,
  customerName,
) => {
  const axioxConfig = {
    method: 'GET',
    params: {
      apiKey: 'NmQ3ODcxNjM0ZDY5NjU3MDM5NjU2ZDU0NDQ0YjUwMzU=', //Text local api key
      sender: 'SRVSRO',
      numbers: `${customerMobileNumber}`,
      message: `Hello ${customerName}, Your monthly service OTP is generated.Your OTP is ${otp}. Please do not share the OTP to anyone. For further details please call ${distNumber}. HYDROCARE.`,
    },
    url: 'https://api.textlocal.in/send/',
  };
  return new Promise((resolve, reject) => {
    axios(axioxConfig)
      .then(x => resolve(x.data))
      .catch(x => reject(x.data));
  });
};
