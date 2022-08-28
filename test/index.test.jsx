import { request } from './request';

// jest.mock('./request');

const searchTx = (address, page, pageSize) => {
  return request({
    url: 'https://d7266ea5-znkhbcsamvsuavk5e8uzujb8e42g8jgrt5rh.did.abtnet.io:8443/api/tsx',
    method: 'Get',
    params: {
      address,
      page,
      pageSize,
    },
    proxy: {
      protocol: 'http',
      host: '192.168.99.119',
      port: 9527,
    },
  }).catch((err) => {
    return { result: -999, msg: 'fail' };
  });
};

describe('搜索', () => {
  test('普通搜索', () => {
    return searchTx('0xeb2a81e229b68c1c22b6683275c00945f9872d90', 1, 2).then((res) => {
      expect(res.error).toStrictEqual(0);
      expect(res.data.length).toStrictEqual(2); // 长度严格等于2
    });
  });
  test('失败搜索（地址不正确）', () => {
    // request.mockResolvedValue({ result: 1 });
    return searchTx('', 1, 2).then((res) => {
      expect(res.error).toStrictEqual(1);
    });
  });
});
