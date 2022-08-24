let PROD = true;

export const API = `http://${PROD?"api.commerciallistingspro.com":"127.0.0.1"}:5000`;
export const PAYMENT = `http://${PROD?"pay.commerciallistingspro.com":"127.0.0.1"}:8000`;
export const Client = `http://${PROD?"commerciallistingspro.com":"127.0.0.1"}:3000`;
export const IMG = `https://storage.googleapis.com/clp-image`;
export const PROF_IMG = `https://storage.googleapis.com/clp-profile-image`;
export const allowedRoutes = 
[ 
    "/", 
    "/about", 
    "/auth/login", 
    "/auth/signup", 
    "/report" 
]
    