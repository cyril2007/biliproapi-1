// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 23233;
const cookies = [
    process.env.COOKIE1,
    process.env.COOKIE2,
    process.env.COOKIE3,
    process.env.COOKIE4,
    process.env.COOKIE5,
    process.env.COOKIE6
  ];
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

// 过滤出非空的cookie
const nonEmptyCookies = cookies.filter(cookie => cookie && cookie.trim() !== '');

// 随机选择一个非空cookie，如果没有可用的非空cookie，使用备用逻辑或默认值
const randomNonEmptyCookie = nonEmptyCookies[Math.floor(Math.random() * nonEmptyCookies.length)] || 'default_cookie';;



// 获取视频链接的路由处理函数
async function getVideoLink(req, res) {
  try {
    const { BV, P } = extractBVandP(req.query.url);

    // 获取cid
    const cidResponse = await axios.get(`https://api.bilibili.com/x/player/pagelist?bvid=${BV}`, {
        headers: {
          'Cookie': randomNonEmptyCookie // 在这里添加cookie
        }
      });
    const cid = cidResponse.data.data[P - 1].cid;

    // 获取视频链接
    const videoLinkResponse = await axios.get(`https://api.bilibili.com/x/player/playurl?bvid=${BV}&cid=${cid}&qn=116&type=&otype=json&platform=html5&high_quality=1`, {
      headers: {
          'Cookie': randomNonEmptyCookie // 在这里添加cookie
        },
      withCredentials: true,
    });

    const videoUrl = videoLinkResponse.data.data.durl[0].url;
    //res.send(videoUrl); // 将视频链接作为响应返回，此处隐藏若有需要自行调整
    console.log(`[${new Date().toISOString()}] 跳转后的链接: ${videoUrl}`);
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