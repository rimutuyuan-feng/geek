const TOKEN_KEY = 'token-my'

export const setToken = (token) => {
	window.localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const hasToken = () => !!getToken()
