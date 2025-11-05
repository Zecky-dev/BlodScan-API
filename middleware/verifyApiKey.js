export const verifyApiKey = (req, res, next) => {
    const clientApiKey = req.header('X-Api-Key');    
    const secretApiKey = process.env.API_KEY_SECRET; 
    if (!clientApiKey || clientApiKey !== secretApiKey) {
        console.warn('API_SECURITY_WARNING: A request detected without API key');
        return res.status(401).json({ 
            success: false, 
            error: 'Unauthorized: Missing or invalid API Key.' 
        });
    }
    next();
};