import axios from "axios";
import jsonBig from "json-bigint";
const axiosInstance = axios.create({
  baseURL: "/api",
  transformResponse: [
    (data) => {
      try {
        let temp = jsonBig.parse(data);
        if (temp.code === 2001) {
          // 获取用户信息接口
          if (temp.data.userEmail) {
            temp.data.userId = temp.data.userId.c.reduce(
              (cur, pre) => cur + pre,
              ""
            );
            if (temp.data.portraitPath !== null) {
              temp.data.portraitPath = `http://${temp.data.portraitPath}`;
            }
          } else {
            // 修改头像接口
            temp.data = `http://${JSON.parse(temp.data).url}`;
          }
        }
        // 获取文件夹文章列表
        if (temp.code === 5006) {
          console.log(temp.data);
          let { folderList, articleList } = temp.data;
          if (folderList.length !== 0) {
            temp.data.folderList = folderList.filter((item) => item !== null);
            if (temp.data.folderList.length !== 0) {
              temp.data.folderList = temp.data.folderList.map((item) => {
                if (item.userId) {
                  return {
                    fatherFolderId: item.fatherFolderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    folderId: item.folderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    folderName: item.folderName,
                    userId: item.userId.c.reduce((cur, pre) => cur + pre, ""),
                    type: "folder",
                    id: item.folderId.c.reduce((cur, pre) => cur + pre, ""),
                    children: [],
                  };
                } else {
                  return {
                    fatherFolderId: item.fatherFolderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    folderId: item.folderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    folderName: item.folderName,
                  };
                }
              });
            }
          }
          if (articleList.length !== 0) {
            temp.data.articleList = articleList.filter((item) => item !== null);
            if (temp.data.articleList.length !== 0) {
              temp.data.articleList = temp.data.articleList.map((item) => {
                if (item.userId) {
                  return {
                    fatherFolderId: item.fatherFolderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    articleId: item.articleId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    articleName: item.articleName,
                    userId: item.userId.c.reduce((cur, pre) => cur + pre, ""),
                    type: "article",
                    id: item.articleId.c.reduce((cur, pre) => cur + pre, ""),
                  };
                } else {
                  return {
                    fatherFolderId: item.fatherFolderId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    articleId: item.articleId.c.reduce(
                      (cur, pre) => cur + pre,
                      ""
                    ),
                    articleName: item.articleName,
                  };
                }
              });
            }
          }
        }
        //
        if (temp.code === 3007) {
          if (temp.data.list) {
            temp.data.create.userId = temp.data.create.userId.c.reduce(
              (cur, pre) => cur + pre,
              ""
            );
          } else {
            temp.data.articleCreateUserId =
              temp.data.articleCreateUserId.c.reduce(
                (cur, pre) => cur + pre,
                ""
              );
            temp.data.articleId = temp.data.articleId.c.reduce(
              (cur, pre) => cur + pre,
              ""
            );
            temp.data.fatherFolderId = temp.data.fatherFolderId.c.reduce(
              (cur, pre) => cur + pre,
              ""
            );
          }
        }
        return temp;
      } catch (error) {
        console.log(error, "出错了");
      }
    },
  ],
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url !== ("/user/login" && "/user/register") &&
      localStorage.getItem("token")
    ) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) =>
    res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
  (err) => Promise.reject(err.data)
);

export default axiosInstance;
