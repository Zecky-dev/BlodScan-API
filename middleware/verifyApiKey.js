export const verifyApiKey = (req, res, next) => {
    const clientApiKey = req.header('X-Api-Key');    
    console.log('CLIENT_API_KEY', clientApiKey); 
    const secretApiKey = process.env.API_KEY_SECRET; 
    console.log('SECRET_API_KEY', secretApiKey);
    if (!clientApiKey || clientApiKey !== secretApiKey) {
        console.warn('API_SECURITY_WARNING: A request detected without API key');
        return res.status(401).json({ 
            success: false, 
            error: 'Unauthorized: Missing or invalid API Key.' 
        });
    }
    next();
};