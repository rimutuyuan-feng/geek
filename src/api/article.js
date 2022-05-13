import request from 'utils/request'
export const getArticles = (params = {}) => {
	return request({
		method: 'get',
		url: 'mp/articles',
		params,
	})
}
export const deleteArticle = (id) => {
	return request({
		method: 'delete',
		url: `mp/articles/${id}`,
	})
}

export const addArticle = (data,draft=false) => {
	return request.post(`mp/articles?draft=${draft}`, data)
}
