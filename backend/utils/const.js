const URLExp = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]+)(\/[-a-zA-Z0-9._~:?#[\]@!$&'()*+,;=]*)*\/?#?$/i;

const allowedCors = [
  'http://bladerunner.nomoredomainsmonster.ru/',
  'https://bladerunner.nomoredomainsmonster.ru/',
  'localhost:3000',
];

export default { URLExp, allowedCors };
