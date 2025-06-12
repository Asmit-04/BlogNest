// import jwt from 'jsonwebtoken'



// export const onlyadmin = async (req, res, next) => {
//     try {
//         const token = req.cookies.access_token
//         if (!token) {
//             return next(403, 'Unathorized')
//         }
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
//         if (decodeToken.role === 'admin') {
//             req.user = decodeToken
//             next()
//         } else {
//             return next(403, 'Unathorized')
//         }
//     } catch (error) {
//         next(500, error.message)
//     }
// }





import jwt from 'jsonwebtoken'
import { handleError } from '../helpers/handleError.js'  // Assuming you have this helper

export const onlyadmin = async (req, res, next) => {
    try {
        // console.log("🔐 onlyadmin middleware triggered.")

        const token = req.cookies.access_token
        if (!token) {
            // console.warn("❌ No token found in cookies.")
            return next(handleError(403, 'Unauthorized: No token provided'))
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("🔍 Decoded token:", decodedToken)

        if (decodedToken.role === 'admin') {
            req.user = decodedToken
            // console.log("✅ User is admin, proceeding.")
            next()
        } else {
            // console.warn("❌ User role is not admin:", decodedToken.role)
            return next(handleError(403, 'Unauthorized: Admins only'))
        }
    } catch (error) {
        // console.error("🔥 Error in onlyadmin middleware:", error)
        next(handleError(500, error.message))
    }
}

// export const onlyadmin = async (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) throw new Error('Unauthorized - No token');

//     const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("🧪 Decoded Token:", decodeToken);

//     if (decodeToken.role === 'admin') {
//         req.user = decodeToken;
//         next();
//     } else {
//         throw new Error('Unauthorized - Not admin');
//     }
// };
