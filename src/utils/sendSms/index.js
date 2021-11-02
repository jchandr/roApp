var axios = require('axios');

export const sendWelcomeMessage = (
  brandName,
  distName,
  custId,
  distNumber,
  customerMobileNumber,
) => {
  const axioxConfig = {
    method: 'post',
    params: {
      apiKey: 'NmQ3ODcxNjM0ZDY5NjU3MDM5NjU2ZDU0NDQ0YjUwMzU=', //Text local api key
      sender: 'SORYAF',
      numbers: `91${customerMobileNumber}`,
      message: `Hello customer, Thanks for purchasing ${brandName} from ${distName}. Your customer Id is ${custId}For further details please call ${distNumber}. HYDROCARE`,
    },
    url: 'https://api.textlocal.in/send/',
  };

  return new Promise((resolve, reject) => {
    axios(axioxConfig)
      .then(x => resolve(x.data))
      .catch(x => reject(x.data));
  });
};
