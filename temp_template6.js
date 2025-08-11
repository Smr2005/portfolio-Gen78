        }
        
        .social-link:hover {
            color: white;
            transform: scale(1.1);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <!-- Contact Section -->
    <section id="contact" class="gradient-bg text-center" style="padding: 60px 0; color: white;">
        <div class="container">
            <h3 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Ready to Drive Results Together?</h3>
            <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">Let's discuss how I can help grow your business.</p>
            ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg" style="font-size: 1.1rem; padding: 15px 40px;">
                <i class="fas fa-envelope me-2"></i>Start the Conversation
            </a>` : ''}
            <div style="margin-top: 3rem;">
                <p style="opacity: 0.8; margin: 0;">&copy; ${new Date().getFullYear()} ${data.name} - Marketing Portfolio</p>
                <small style="opacity: 0.6;">Powered by <a href="${getFrontendUrl()}" target="_blank" style="color: rgba(255,255,255,0.8);">Portfolio Generator</a></small>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('🚀 Server running on port ' + PORT);
    console.log('📊 Backend URL: http://localhost:' + PORT);
    console.log('🌐 Environment: ' + (process.env.NODE_ENV || 'development'));
});