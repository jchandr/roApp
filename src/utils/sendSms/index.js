var axios = require('axios');

export const serviceAlert = (customerName, customerMobileNumber, dueDate) => {
  const axioxConfig = {
    method: 'post',
    params: {
      apiKey: 'NmQ3ODcxNjM0ZDY5NjU3MDM5NjU2ZDU0NDQ0YjUwMzU=', //Text local api key
      sender: 'SORYAF',
      numbers: `91${customerMobileNumber}`,
      message: `Hello ${customerName}, Thanks for your visit # ${dueDate}. Download your estimate here ${dueDate}. Thank you, SORYASTEELS.COM`,
    },
    url: 'https://api.textlocal.in/send/',
  };

  return new Promise((resolve, reject) => {
    axios(axioxConfig)
      .then(x => resolve(x.data))
      .catch(x => reject(x.data));
  });
};
