
//课程分类相关的方法

import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

//获取mock的数据有主机名不会拼接
//const MOCK_URL =`http://localhost:8888${BASE_URL}`

// 获取讲师
export function reqGetSubjectList(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

