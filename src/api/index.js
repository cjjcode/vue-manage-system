import Http from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
}
export const login = query => {
   return Http.post(`/user/login`, query)
}
export const getUserByQuery = query => {
   return Http.post(`/user/getByQuery`, query)
}
export const updateUser = query => {
   return Http.post(`/user/update`, query)
}

export const getAllCooperCode = query => {
   return Http.get(`/cooper/admin/getAllCode?type=`+query)
}
export const upsertCooperCode = query => {
    return Http.post(`/cooper/admin/add_code`, query)
}

export const getClassByQuery = query => {
    return Http.post(`/cooper/class/getClassByQuery`, query)
}
export const updateClass = query => {
    return Http.post(`/cooper/class/updateClass`, query)
}