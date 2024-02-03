import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'very-secret-token', {
  expiresIn: '5d',
});

export default generateToken;
