import jwt from 'jsonwebtoken';

const SECRET_KEY ='hello123';

export const getUserToken = () => {
  const token = localStorage.getItem('token');
//   console.log("AuthToken");
//   console.log(token);
  if (!token) {
    return null;
  }

  try {
    //   console.log("decoded token")
      const decoded = jwt.verify(token,SECRET_KEY);
      
    // console.log(decoded);
    return decoded;
  } catch (err) {
    console.error('Token is invalid or expired', err);
    return null;
  }
};
