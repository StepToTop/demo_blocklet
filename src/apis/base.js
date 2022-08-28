import { Toast } from '@douyinfe/semi-ui';
import { store } from 'xijs';
import axios from '../libs/api';

class Service {
  async getTx(params) {
    const key = `${params.address}_${params.page}_${params.pageSize}`;
    const cacheRet = store.get(key);
    if (cacheRet.value) {
      return JSON.parse(cacheRet.value);
    }
    const ret = await axios
      .get('/api/tsx', {
        params,
      })
      .then((res) => {
        store.set(key, JSON.stringify(res.data), Date.now() + 5000);
        return res.data;
      })
      .catch((error) => {
        Toast.error(error.message);
      });
    return ret;
  }
}

export default new Service();
