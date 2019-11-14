const TokenKey = 'AdminToken'

export function getToken() {
  var data = window.localStorage? localStorage.getItem(TokenKey): null;
  if(data && data != 'undefined'){
  	return JSON.parse(data);
  }
  return '';
}

export function setToken(token) {
  	if (window.localStorage) {
  		try {
  			localStorage.setItem(TokenKey, JSON.stringify(token));
  		} catch(e) {
  			alert('请关闭无痕浏览模式')
  		}
  	}
}

export function removeToken() {
  	if (window.localStorage) {
  		try {
  			localStorage.removeItem(TokenKey);	
  		} catch(e){
  		}
  	    
  	}
}