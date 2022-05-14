import request from 'utils/request'
export const getArticles = (params = {}) => {
	return request({
		method: 'get',
		url: 'mp/articles',
		params,
	})
}
export const getArticle = (id) => {
	return request.get(`mp/articles/${id}`)
}
export const deleteArticle = (id) => {
	return request({
		method: 'delete',
		url: `mp/articles/${id}`,
	})
}

export const addArticle = (data, draft = false) => {
	return request.post(`mp/articles?draft=${draft}`, data)
}
export const editArticle = (data, draft = false, id) => {
	return request.put(`mp/articles/${id}?draft=${draft}`, data)
}
