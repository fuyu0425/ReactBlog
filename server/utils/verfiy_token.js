import jwt from 'jsonwebtoken';
import config from '../config';

const { secret }= config;

async function Verify(req, res, next) {
  const { token }=req.body;
  try {
    await jwt.verify(token, secret);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error : 'no pass' });
  }
}
export default Verify;
