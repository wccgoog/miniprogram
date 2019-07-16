export default [
  {
    name: '浙江省',
    code: '100000',
    type: '1',
    childList: [
      {
        name: '杭州市',
        code: '101000',
        pcode: '10000',
        type: '2',
        childList: [
          {
            name: '上城区',
            code: '101001',
            pcode: '101000',
            type: '3',
          },
          {
            name: '江干区',
            code: '101002',
            pcode: '101000',
            type: '3',
          },
        ],
      },
      {
        name: '宁波市',
        code: '102000',
        pcode: '10000',
        type: '2',
        childList: [
          {
            name: '余姚市',
            code: '102001',
            pcode: '102000',
            type: '3',
          },
          {
            name: '慈溪市',
            code: '102002',
            pcode: '102000',
            type: '3',
          },
        ],
      },
      {
        name: '温州市',
        code: '103000',
        pcode: '100000',
        type: '2',
        childList: [
          {
            name: '鹿城区',
            code: '103001',
            pcode: '103000',
            type: '3',
          },
          {
            name: '瓯海区',
            code: '103002',
            pcode: '103000',
            type: '3',
          },
        ],
      },
      {
        name: '湖州市',
        code: '104000',
        pcode: '100000',
        type: '2',
        childList: [
          {
            name: '吴兴区',
            code: '104001',
            pcode: '104000',
            type: '3',
          },
          {
            name: '南浔区',
            code: '104002',
            pcode: '104000',
            type: '3',
          },
        ],
      },
      {
        name: '嘉兴市',
        code: '105000',
        pcode: '100000',
        type: '2',
        childList: [
          {
            name: '南湖区',
            code: '105001',
            pcode: '105000',
            type: '3',
          },
          {
            name: '秀洲区',
            code: '105002',
            pcode: '105000',
            type: '3',
          },
        ],
      },
      {
        name: '绍兴市',
        code: '106000',
        pcode: '100000',
        type: '2',
        childList: null,
      },
    ],
  },
];
