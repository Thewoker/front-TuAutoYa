import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGwsOPFXBebieB\nqL+abbJDQoHGENtr81vuHjGBw0ESkSEIbmRSFIF6NTEht1WxO7RBaKG9l9exAl8w\n5eOIJ1sqJXdJwbc0OqUmdW8Lt8yOVd/KtGjjuoi5CLdjBAL4t1bqd9JgK15CQgKL\nyG8Kl571ncGU2ut/02oa8yz6/max2kFAPnhCljooJ3/ssaYrFTSCiDH5yIry9Pin\nFyrwd6qgSh0DCKYbxcreySCObr+RecN6P0VhCpSlOq+LDijSYVOTcJMcZoOGnIl1\n8C203YZuVE/pmgwvgzxebv4NJRt7KmynD5MMKmfkQjFaalW9039/q+cv5GCGx3IE\nISpT79cLAgMBAAECggEAAlTpzanXTbHpvotd7vqJ14o8LnMnZFu2fTmXQ2LxV7bP\nTW+Zck6gKwjBEG8t50uRzoVHWMnJS8C4hNyJAS9XR8jLWxbXSiGbPHUIvF29Vsou\nAE7qEcSNctcBkSZvGa3uHmGUvYHVmhjRQOjzZs0ZObzRyDzKJWmfEM5wO8T2Hjy4\npNyrg6Q+R6xkVZOEL04qPsrPkxsszdOycLkmomeJlHisR84UhjEJuXHHue+fzKiw\nlCUK5A8GziFam6W9ozD8Mys2bTbZEBMWhuTcfhog35oRZnP91Qr4bFALCSocCG9m\naMiQTmLvn+v9CwhOYwl+Nx9/eebY18mxmEGTRmU6KQKBgQDv1qj86i6tSb4Bksas\n1J75EOoAYLo0RcsnNTy/XsG0atX6IOqdx7pOJzsKlihXV52sbZRUieAQG6Znz15l\ne707kfl9JnP15VrWZZZXaJJyd8TdRzgXbG/GytvViAwaSm+QTCJV6+Y0X3npr+8i\nGX4f27bRV1rEDG3bnDWIcdoiKQKBgQDUJ33b93Mi1Ig0rf6ZopHiQ/fSdResf4E6\n1e58lP8wrdyaMxFfkm9F4FarYavSyZr9mJAQ3fFuQJYlDJiZLTUotO2Hy5z1StAL\nXMwQKHVEHlR5cJbbuAg0FFXVStP3x7iIP8jfwaJTg4Hbs+nLayxyLS0JiWEviVAK\n1Edre5qeEwKBgQCmYwuVenmrao9Q1BzU5iTrsZpFbNWBUjIgH0TnlrtXiQ6tmoxp\nrZhIg9rn+0g9X+FZMCRJieVSB3yoZCqeyPt9CkZFVpn4K4ebWZq1RSzkEMcYpEH7\nrhTVmwJr3xhWXPGM7+SaKy/ngZ04S//gbkMbovfvv2SOwfis9HAHGsU0EQKBgQCT\njNPQBI2jD8WbPdfw6kwj3bmiOaW5ZwRt8xPmuYmyRXlEFXhjy+hv5NLiZw+ljmmp\nLk4kLPgZAfpq0hPflL2ADjWVWFtVji6beHLEWh8UvTNrMo75SUkLT4lSyrQZhGIn\nAJWoaXeINdI/ByX3QBatYhYMp+tbsFhm77SsYE7s2QKBgQDgAatOVLrNMTq6HcNq\nHVGXHzpijiGUETNkfhIVnkxKV0PaHussMDukW5gpYzzJtr5x5DcLp9ZIkNIm2ar5\n37IeIVa80pz+JLRERi5pMPQ5qLXPsDsKMsLhHOQ9aUS8NNUQO5m5U5oK4LsnhEPx\nS3kC1/x3aKCKsM42enupgTgYtw==\n-----END PRIVATE KEY-----\n",
  authDomain: "googleapis.com",
  projectId: "auth-user-f8c65",
  storageBucket: "tuautoya-43f02.firebasestorage.app",
  messagingSenderId: "822543021709",
 appId: "1:822543021709:web:3c03236fdc77170f07d4c4",
  measurementId: "G-VBSWW48DV2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {  signInWithPopup }

