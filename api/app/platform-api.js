const axios = require('axios');

module.exports = {
  async getTxList(req, res) {
    const ret = await axios({
      proxy: {
        protocol: 'http',
        host: '192.168.99.133',
        port: 7890,
      },
      method: 'get',
      url: `https://api.etherscan.io/api?module=account&action=txlist&address=${
        req?.query?.address || ''
      }&startblock=0&endblock=99999999&page=${parseInt(req?.query?.page || 1, 10)}&offset=${parseInt(
        req?.query?.pageSize || 10,
        10
      )}&sort=desc&apikey=AZIP8U733C4QRT7Q5W1Q9QSIIEV1PH2I35`,
    });
    if (ret.status !== 200) {
      return res.json({
        error: 1,
        message: '网络异常！',
      });
    }
    return res.json({
      error: 0,
      data: ret.data?.result || [],
    });
  },
};
