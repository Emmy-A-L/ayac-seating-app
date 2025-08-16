// import { useEffect, useState } from "react";

// const getUser = async () => {
//     try {
//         const response = await fetch("/api/auth/validate", {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (!response.ok) {
//             return null;
//         }
//         const user = await response.json();
//         return user;
//     } catch (error) {
//         console.error("Error fetching user:", error);
//     }
// }

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const authenticate = async () => {
//       setLoading(true);
//       const user = await getUser();
//       setUser(user);
//       setLoading(false);
//     };

//     authenticate();
//   }, []);

//   const isAuthenticated = !!user;

//   return {
//     user,
//     loading,
//     isAuthenticated,
//   };
// };
