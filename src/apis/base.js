import { Toast } from '@douyinfe/semi-ui';
import axios from '../libs/api';

class Service {
  async getTx(params) {
    const ret = await axios
      .get('/api/tsx', {
        params,
      })
      .then((res) => res.data)
      .catch((error) => {
        Toast.error(error.message);
      });
    return ret;
  }
}

export default new Service();
