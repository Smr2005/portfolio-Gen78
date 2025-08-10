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
            fontFamily: 'Arial, sans-serif',
            padding: window.innerWidth < 768 ? '1rem' : '0'
        }}>
            <div style={{
                textAlign: 'center',
                padding: window.innerWidth < 480 ? '20px' : window.innerWidth < 768 ? '30px' : '40px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                width: window.innerWidth < 768 ? '100%' : 'auto',
                maxWidth: window.innerWidth < 768 ? '400px' : 'none'
            }}>
                <h1 style={{
                    fontSize: window.innerWidth < 480 ? '1.5rem' : window.innerWidth < 768 ? '1.8rem' : '2rem',
                    marginBottom: '1rem'
                }}>
                    🛠️ Redirecting to Admin Panel...
                </h1>
                <p style={{
                    fontSize: window.innerWidth < 480 ? '0.9rem' : '1rem',
                    lineHeight: '1.5'
                }}>
                    Please wait while we redirect you to the admin interface.
                </p>
                <div style={{
                    marginTop: '20px',
                    fontSize: window.innerWidth < 480 ? '12px' : '14px',
                    opacity: '0.8',
                    lineHeight: '1.4'
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