// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 23233;

// 解析URL中的查询参数
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 提取BV号和P值的辅助函数
function extractBVandP(url) {
  let BV = url.match(/(?=BV).*?(?=\?|\/)/);
  let P = url.match(/(?<=p=).*?(?=&vd)/);

  if (!BV) {
    BV = url.match(/(?<=bvid=).*?(?=&)/);
  }

  if (!P) {
    P = 1;
  }

  return { BV: BV ? BV[0] : null, P: parseInt(P, 10) };
}

// 获取视频链接的路由处理函数
async function getVideoLink(req, res) {
  try {
    const { BV, P } = extractBVandP(req.query.url);

    // 获取cid
    const cidResponse = await axios.get(`https://api.bilibili.com/x/player/pagelist?bvid=${BV}`);
    const cid = cidResponse.data.data[P - 1].cid;

    // 获取视频链接
    const videoLinkResponse = await axios.get(`https://api.bilibili.com/x/player/playurl?bvid=${BV}&cid=${cid}&qn=116&type=&otype=json&platform=html5&high_quality=1`, {
      withCredentials: true,
    });

    const videoUrl = videoLinkResponse.data.data.durl[0].url;
    //res.send(videoUrl); // 将视频链接作为响应返回，此处隐藏若有需要自行调整
    res.redirect(302, videoUrl); //跳转至视频链接
   
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// 设置路由
app.get('/biliapi', getVideoLink);

// 启动服务器
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});