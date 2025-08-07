import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserProfileClean = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  
  const [success, setSuccess] = useState('');

  if (!state || !state.name) {
    return (
      <div style={{ 
        padding: '50px', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h3>Please log in to access your profile</h3>
        <button 
          onClick={() => history.push('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    
    if (dispatch) {
      dispatch({ type: "CLEAR" });
    }
    
    history.push('/');
  };

  const navigateTo = (path) => {
    history.push(path);
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    title: {
      margin: 0,
      color: '#333'
    },
    subtitle: {
      color: '#6c757d',
      margin: '5px 0 0 0'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    infoButton: {
      backgroundColor: '#17a2b8',
      color: 'white'
    },
    card: {
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
      marginBottom: '30px'
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    alert: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px',
      border: '1px solid #c3e6cb',
      position: 'relative'
    }
  };

  return (
    <div>
      {/* Navigation */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px 20px', 
        borderBottom: '1px solid #dee2e6' 
      }}>
        <h4 style={{ margin: 0, color: '#333' }}>Portfolio Generator</h4>
      </div>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Welcome back, {state.name}! 👋</h2>
            <p style={styles.subtitle}>Manage your portfolios and account settings</p>
          </div>
          <div style={styles.buttonGroup}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigateTo('/templates')}
            >
              Create New Portfolio
            </button>
            <button 
              style={{...styles.button, ...styles.secondaryButton}}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div style={styles.alert}>
            {success}
            <button 
              style={{ 
                position: 'absolute',
                right: '15px',
                top: '15px',
                background: 'none', 
                border: 'none', 
                fontSize: '18px', 
                cursor: 'pointer',
                color: '#155724'
              }}
              onClick={() => setSuccess('')}
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <h5 style={{ marginBottom: '15px', color: '#333' }}>Quick Actions</h5>
            <div style={styles.flexColumn}>
              <button 
                style={{...styles.button, ...styles.primaryButton}}
                onClick={() => navigateTo('/templates')}
              >
                Create New Portfolio
              </button>
              <button 
                style={{...styles.button, ...styles.infoButton}}
                onClick={() => navigateTo('/dashboard')}
              >
                Portfolio Dashboard
              </button>
            </div>
          </div>
          
          <div style={styles.card}>
            <h5 style={{ marginBottom: '15px', color: '#333' }}>Account Info</h5>
            <p><strong>Name:</strong> {state.name}</p>
            <p><strong>Email:</strong> {state.email}</p>
            <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div style={styles.card}>
          <h5 style={{ marginBottom: '15px', color: '#333' }}>Portfolio Statistics</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#007bff' }}>0</h3>
              <p style={{ margin: 0, color: '#6c757d' }}>Total Portfolios</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#28a745' }}>0</h3>
              <p style={{ margin: 0, color: '#6c757d' }}>Published</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#ffc107' }}>0</h3>
              <p style={{ margin: 0, color: '#6c757d' }}>Drafts</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.card}>
          <h5 style={{ marginBottom: '15px', color: '#333' }}>Recent Activity</h5>
          <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
            <p>No recent activity to display.</p>
            <p>Start by creating your first portfolio!</p>
            <button 
              style={{...styles.button, ...styles.primaryButton, marginTop: '10px'}}
              onClick={() => navigateTo('/templates')}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileClean;