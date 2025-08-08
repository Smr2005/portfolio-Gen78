import React, { useEffect } from 'react';

const AdminPanel = () => {
    useEffect(() => {
        // Get the correct admin URL based on environment
        const getAdminUrl = () => {
            // In production, use the same domain as the current page
            if (process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost') {
                return `${window.location.origin}/admin-secure`;
            }
            // In development, use the backend server
            return 'http://localhost:5000/admin-secure';
        };
        
        // Redirect to the admin cleanup interface after a short delay
        const timer = setTimeout(() => {
            window.location.href = getAdminUrl();
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '40px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
            }}>
                <h1>🛠️ Redirecting to Admin Panel...</h1>
                <p>Please wait while we redirect you to the admin interface.</p>
                <div style={{
                    marginTop: '20px',
                    fontSize: '14px',
                    opacity: '0.8'
                }}>
                    If you're not redirected automatically, 
                    <a 
                        href={
                            process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost'
                                ? `${window.location.origin}/admin-secure`
                                : 'http://localhost:5000/admin-secure'
                        } 
                        style={{color: 'white', marginLeft: '5px'}}
                    >
                        click here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;