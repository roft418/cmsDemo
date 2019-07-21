const initialData = [
  {
    title: "轮播",
    children: [
      {
        comp: "carousel",
        key: "carousel",
        compProps: {
          templateType: 1,
          items: [
            // { title: 1, url: 2, linkType: "a" }
          ]
        }
      }
    ]
  },

  {
    title: "广告",
    children: [
      {
        comp: "advertList",
        key: "advertList",
        compProps: {
          templateType: 2,
          items: [
            // { sortId: 1, title: 1, url: 2, linkType: "a" },
            // { sortId: 1, title: 1, url: 2, linkType: "a" },
            // { sortId: 1, title: 1, url: 2, linkType: "a" }
          ]
        }
      }
    ]
  },
  {
    title: "商品",
    children: [
      {
        comp: "goodsList",
        key: "goodsList",
        compProps: {
          templateType: 3,
          goodsType: "1",
          items: [
            // {
            //   productCode: 1,
            //   productName: 2,
            //   imgUrl: "",
            //   linkType: "a"
            // },
            // {
            //   productCode: 1,
            //   productName: 2,
            //   imgUrl:
            //     "https://img.yzcdn.cn/upload_files/2014/12/05/bb3503203766425965b7517336df979d.png!large.png",
            //   linkType: "a"
            // },
            // {
            //   productCode: 1,
            //   productName: 2,
            //   imgUrl:
            //     "https://img.yzcdn.cn/upload_files/2014/12/05/bb3503203766425965b7517336df979d.png!large.png",
            //   linkType: "a"
            // },
            // {
            //   productCode: 1,
            //   productName: 2,
            //   imgUrl:
            //     "https://img.yzcdn.cn/upload_files/2014/12/05/bb3503203766425965b7517336df979d.png!large.png",
            //   linkType: "a"
            // }
          ]
        }
      }
    ]
  },
  {
    title: "分类入口",
    children: [
      {
        comp: "entranceList",
        key: "entranceList",
        compProps: {
          templateType: 4,
          items: [
            // { sortId: 1, title: 1, url: 2, linkType: "a" },
            // { sortId: 3, title: 3, url: 4, linkType: "a" },
            // { sortId: 5, title: 5, url: 6, linkType: "a" },
            // { sortId: 7, title: 7, url: 8, linkType: "a" }
          ]
        }
      }
    ]
  },
  {
    title: "分割线",
    children: [
      {
        comp: "splitLine",
        key: "splitLine",
        compProps: {
          templateType: 5,
          allItems: [],
          items: [
            // {
            //   imgUrl:
            //     "https://img.yzcdn.cn/upload_files/2014/12/05/bb3503203766425965b7517336df979d.png!large.png"
            // },
            // {
            //   imgUrl:
            //     "https://img.yzcdn.cn/upload_files/2018/05/10/FiwrSj1YlkTDOLUNoR7h4rQFrqOJ.png!large.webp"
            // }
          ]
        }
      }
    ]
  }
];
// type：1 banner 2 图片广告 3 商品 4 分类 5分割线

const TypeMap = {
  轮播: 1,
  广告: 2,
  商品: 3,
  分类入口: 4,
  分割线: 5
};
let _sordId = 1;
const addSortId = () => _sordId++;
const sortId = value => (value ? (_sordId = value) : _sordId);

const compiler = templateVOList => {
  console.info(templateVOList);

  let result = templateVOList.map(templateVO => {
    let content = initialData[templateVO.type - 1];
    const {
      children: [child]
    } = content;

    let items = templateVO.templateDetailVOList.map(templateDetailVO => {
      if (templateVO.type === 3) {
        templateDetailVO.productCode = templateDetailVO.code;
        templateDetailVO.productName = templateDetailVO.name;
        delete templateDetailVO.code;
        delete templateDetailVO.name;
      }
      return templateDetailVO;
    });

    child.compProps = { ...child.compProps, sortId: _sordId++, items };
    return content;
  });
  return result;
};
const deCompiler = content => {
  console.info(content);

  let tempVO = {};
  let result = content.map(template => {
    const {
      children: [{ compProps }]
    } = template;
    const { items } = compProps;
    let templateDetailVOList = items.map(detail => {
      let detailVo = {
        deleteList: detail.deleteList,
        code: detail.productCode,
        id: detail.id,
        imgUrl: detail.imgUrl,
        link: detail.link,
        linkType: detail.linkType,
        name: compProps.templateType === 3 ? detail.productName : detail.title,
        templateId: detail.templateId
      };
      return detailVo;
    });
    tempVO = {
      deleteList: compProps.deleteList,
      id: compProps.id,
      manageId: compProps.manageId,
      subType: compProps.subType,
      type: compProps.templateType,
      templateDetailVOList: templateDetailVOList
    };
    return tempVO;
  });
  return result;
};

export { initialData, TypeMap, compiler, deCompiler, addSortId, sortId };
