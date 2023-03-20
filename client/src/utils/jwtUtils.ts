function decodeJwt(token: string) {
  //jwt 디코딩 코드 나중에 라이브러리로 대체 가능
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export default decodeJwt;
