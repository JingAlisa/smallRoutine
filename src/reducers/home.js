// 初始化状态
const initState = {
  homeInfo: {},
  dataList: [],
  index: 0,
  path: ''
};

export function home(state = initState, action) {
  switch (action.type) {
    case 'RECEIVE_HOME':
      return {
        ...state,
        homeInfo: action.homeInfo
      };
    case 'SET_INDEX':
      return {
        ...state,
        index: action.index
      };
    case 'SET_PATH':
      return {
        ...state,
        path: action.path
      };
    case 'RECEIVE_FETCHDEMO': {
      const arr = [
        {
          companyName: '华为技术有限公司',
          taxNumber: '914403001922038216',
          address: '深圳市龙岗区坂田华为总部办公楼',
          tell: '0755-28780808',
          bank: '中国工商银行深圳华为支行',
          num: '4000020309024500386'
        },
        {
          companyName: '华为投资控股有限公司',
          taxNumber: '91440300746645251H',
          address: '深圳市龙岗区坂田华为基地B区1号楼',
          tell: '0755-28780808',
          bank: '中国工商银行深圳市分行',
          num: '4000020319200123819'
        },
        {
          companyName: '北京华为数字技术有限公司',
          taxNumber: '91110108785501795T',
          address: '北京市海淀区上地信息路3号',
          tell: '010-82882008',
          bank: '中国银行北京西城支行',
          num: '324656014944'
        },
        {
          companyName: '西安华为技术有限公司',
          taxNumber: '91610131668683606U',
          address: '西安市高新区锦业路127号',
          tell: '029-86488050',
          bank: '中国银行西安高新技术开发区支行',
          num: '103210172992'
        },
        {
          companyName: '华为终端有限公司',
          taxNumber: '914403007556750304',
          address: '深圳市龙岗区坂田华为基地B区2号楼',
          tell: '0755-28780808',
          bank: '中国银行深圳市分行万科城支行',
          num: '757557959933'
        },
        {
          companyName: '成都华为技术有限公司',
          taxNumber: '915101006630031225',
          address: '成都高新西区西源大道1899号',
          tell: '028-64690799',
          bank: '中国工商银行成都高新技术产业开发区支行',
          num: '4402239019000076621'
        }
      ];
      return {
        ...state,
        dataList: arr
      };
    }
    default:
      return { ...state };
  }
};
