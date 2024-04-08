# biliproapi-1
 B站视频解析docker一键部署
 基础代码来源： https://github.com/mmyo456/BiliAnalysis
 
 biliproapi-1
 docker可一键部署：**docker pull cyril2007/biliproapi-1**
 
 https://hub.docker.com/r/cyril2007/biliproapi-1
 
 docker部署时填写环境Cookie1-Cookie6 可使用随机cookie解析1080p视频直链
 若全部留空，则默认解析360p视频直链
 部署后服务器可以看到解析log（解析时间，及解析后地址）
 
 部署后使用ip:23233/biliapi?url=B站完整链接 可直接跳转视频直链地址

仅仅是在服务器部署以后vrchat里基本可以用的情况，还有许多其他的功能可以添加如搜索作者、搜索视频、获取弹幕、CC字幕等（配合 https://github.com/SocialSisterYi/bilibili-API-collect ）大佬们自己看着研究吧，主要我也懒
 
 已知宝塔面板会出现无法顺利填写cookie的情况