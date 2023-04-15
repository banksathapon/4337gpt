type ParsedCookies = { [key: string]: string };

export const parseCookies = (cookieString?: string | null) => {
  const cookies: ParsedCookies = {};
  if (!cookieString) {
    return cookies;
  }

  const cookiePairs = cookieString.split(';');
  cookiePairs.forEach((pair) => {
    const [name, value] = pair.trim().split('=');
    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
  });

  return cookies;
};

export function parseJwt (token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function getTokenInfo(req: Request) {
  const cookies = parseCookies(req.headers.get('cookie'));
  const token = JSON.parse(cookies['supabase-auth-token'])[0];
  const decodedJwt = parseJwt(token);
  return decodedJwt;
}