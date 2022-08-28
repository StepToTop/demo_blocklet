import { useState, useEffect } from 'react';
import { Layout, Nav, Button, Table, Space, Input, Toast, Typography, Select } from '@douyinfe/semi-ui';
import dayjs from 'dayjs';
// import { IconLanguage } from '@douyinfe/semi-icons';
// import { Input } from '@douyinfe/semi-ui/lib/es/input';
import searchService from '@/apis/base';

const { Header, Content } = Layout;
const columns = [
  {
    title: 'txHash',
    dataIndex: 'hash',
  },
  {
    title: 'BlockNumber',
    dataIndex: 'blockNumber',
  },
  {
    title: 'Time',
    dataIndex: 'timeStamp',
    render: (timeStamp) => {
      return dayjs.unix(Number(timeStamp) || 0).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    render: (value) => {
      return Number(value) / 10 ** 18;
    },
  },
  {
    title: 'TxFee',
    dataIndex: 'gasPrice',
    render: (gasPrice, record) => {
      return ((Number(gasPrice) * Number(record.gasUsed)) / 10 ** 18).toFixed(8);
    },
  },
];

function Home() {
  const [[loading, setLoading], [address, setAddress], [page, setPage], [pageSize, setPageSize], [txData, setTxData]] =
    [useState(false), useState(''), useState(1), useState(10), useState([])];

  const fetchList = async () => {
    if (!address) {
      return '';
    }
    try {
      setLoading(true);
      const ret = await searchService.getTx({
        address,
        page,
        pageSize,
      });
      if (!ret || ret.error) {
        setTxData([]);
        throw new Error(ret?.message || '没有内容');
      } else if (ret.data.length < 1) {
        setPage(page - 1);
        throw new Error('当前是最后一页了！');
      }
      Toast.success('获取成功');
      setTxData(ret.data);
      return null;
    } catch (e) {
      return Toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Layout className="components-layout-demo">
      <Header>
        <Nav
          mode="horizontal"
          header={<Typography.Title>作业</Typography.Title>}
          onSelect={(key) => console.error(key)}
          footer={
            <Space>
              <Input id="searchAddress" value={address} onChange={setAddress} />
              <Button
                id="searchButton"
                loading={loading}
                theme="solid"
                onClick={() => {
                  if (page !== 1) {
                    setPage(1);
                  } else {
                    fetchList();
                  }
                }}>
                搜索
              </Button>
            </Space>
          }
        />
      </Header>
      <Content>
        <Table
          style={{
            margin: '0 0 16px',
          }}
          loading={loading}
          dataSource={txData}
          columns={columns}
          pagination={false}
        />
        <Space>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            上一页
          </Button>
          <Typography.Text>当前第{page}页</Typography.Text>
          <Button disabled={txData.length < pageSize} onClick={() => setPage(page + 1)}>
            下一页
          </Button>
          <Select
            prefix="每页展示"
            suffix="条数据"
            value={pageSize}
            onChange={(val) => {
              setPageSize(val);
              setPage(1);
            }}
            optionList={[10, 20, 50].map((value) => ({ label: value, value }))}
          />
        </Space>
      </Content>
    </Layout>
  );
}

export default Home;
