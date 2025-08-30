// index.js
// Minimal, safe entrypoint for the portfolio server.
// Keeps surface area small to avoid accidental paste corruption.
'use strict';

// Load .env (optional)
try { require('dotenv').config(); } catch (e) {}

// Ensure default PORT
process.env.PORT = process.env.PORT || '5000';

const APP_NAME = process.env.APP_NAME || 'portfolio-server';
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`${APP_NAME}: starting (env=${NODE_ENV}, port=${process.env.PORT})`);

// Basic process handlers
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    setTimeout(() => process.exit(1), 100);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    setTimeout(() => process.exit(1), 100);
});

// Delegate to verified baseline implementation
try {
    // index_clean.js should export/start the Express app
    require('./index_clean.js');
} catch (err) {
    console.error('Failed to load ./index_clean.js — aborting.');
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
}

// You can set PORT via environment: $env:PORT=5001; node .\index.js
// To inline baseline instead of delegating, ask me to generate a single-file server.
//
//
//
//
// End
// Single-file server (inlined baseline + templates)
// This file contains a cleaned, runnable Express server and six template generators.
// It prefers a MongoDB connection when MONGO_URI is provided, but will run without DB.

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Optional MongoDB connection (non-fatal)
let mongooseConnected = false;
if (process.env.MONGO_URI) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 }).then(() => {
            mongooseConnected = true;
            console.log('Connected to MongoDB');
        }).catch(err => {
            console.warn('MongoDB connect warning:', err.message);
        });
    } catch (e) {
        console.warn('Mongoose not available or failed to load:', e.message || e);
    }
}

function getFrontendUrl() {
    return process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://portfolio-gen-i1bg.onrender.com' : 'http://localhost:3000');
}

function ensureDataUrls(data) {
    try {
        const productionUrl = process.env.BACKEND_URL || 'https://portfolio-gen-i1bg.onrender.com';
        const s = JSON.stringify(data).replace(/http:\/\/localhost:\d+/g, productionUrl);
        return JSON.parse(s);
    } catch (e) { return data; }
}

// --- Template generators (cleaned, compact versions) ---
function generateTemplate1HTML(data = {}, meta = {}) {
        // normalize
        data = data || {};
        const name = data.name || 'Sample User';
        const about = data.about || '';
        const title = data.title || '';
        const profileImage = data.profileImage || '';
        const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []);
        const projects = Array.isArray(data.projects) ? data.projects : (data.projects ? [data.projects] : []);
        const experience = Array.isArray(data.experience) ? data.experience : (data.experience ? [data.experience] : []);
        const certifications = Array.isArray(data.certifications) ? data.certifications : [];
        const education = Array.isArray(data.education) ? data.education : [];
        const internships = Array.isArray(data.internships) ? data.internships : [];

        const esc = (s) => (s === undefined || s === null) ? '' : String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const renderNav = () => `
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background:rgba(30,41,59,0.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.08);">
                <div class="container">
                    <a class="navbar-brand" href="#top">${esc(name)}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navCollapse" aria-controls="navCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navCollapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="#top">Profile</a></li>
                            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                            <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                            <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                            <li class="nav-item"><a class="nav-link" href="#internships">Internships</a></li>
                            <li class="nav-item"><a class="nav-link" href="#certifications">Certifications</a></li>
                            <li class="nav-item"><a class="nav-link" href="#education">Education</a></li>
                            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>`;

        const renderSkills = () => {
            if (!skills.length) return '';
            return `
                <section id="skills" style="padding:100px 0;background:white">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Technical Skills</h2>
                            <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
                        </div>
                        <div class="row">
                            ${skills.map(skill => {
                                const sName = typeof skill === 'object' ? skill.name : skill;
                                const sLevel = skill && skill.level ? skill.level : 75;
                                const sCategory = skill && skill.category ? skill.category : '';
                                return `
                                    <div class="col-md-6 col-lg-3 mb-4">
                                        <div class="card" style="border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px;height:100%">
                                            <div class="card-body text-center" style="padding:2rem">
                                                <div style="font-size:2.5rem;margin-bottom:1rem;animation:float3d 4s ease-in-out infinite">${sCategory === 'Frontend' ? '🎨' : sCategory === 'Backend' ? '⚙️' : sCategory === 'Database' ? '🗄️' : sCategory === 'Cloud' ? '☁️' : sCategory === 'DevOps' ? '🚀' : '💻'}</div>
                                                <h5 style="color:#1e293b;font-weight:600;margin-bottom:1rem">${esc(sName)}</h5>
                                                <div class="progress" style="height:8px;border-radius:4px;margin-bottom:1rem">
                                                    <div class="progress-bar" role="progressbar" style="width:${sLevel}%;background:linear-gradient(90deg,#667eea,#764ba2)" aria-valuenow="${sLevel}" aria-valuemin="0" aria-valuemax="100">${sLevel}%</div>
                                                </div>
                                                <small style="color:#64748b;font-weight:600">${sLevel}% Proficiency</small>
                                                <div style="margin-top:0.5rem;font-size:0.8rem;color:#94a3b8">${esc(sCategory)}</div>
                                            </div>
                                        </div>
                                    </div>`;
                            }).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderExperience = () => {
            if (!experience.length) return '';
            return `
                <section id="experience" style="padding:100px 0;background:#f8fafc">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Professional Experience</h2>
                            <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-10 mx-auto">
                                ${experience.map(exp => `
                                    <div class="card mb-4" style="border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px">
                                        <div class="card-body" style="padding:2.5rem">
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <h4 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem">${esc(exp.position)}</h4>
                                                    <h5 style="color:#667eea;font-weight:600;margin-bottom:1rem">${esc(exp.company)} • ${esc(exp.location)}</h5>
                                                    <p style="color:#64748b;line-height:1.6;margin-bottom:1.5rem">${esc(exp.description)}</p>
                                                    ${exp.achievements && exp.achievements.length ? `<div><h6 style="color:#1e293b;font-weight:600;margin-bottom:1rem">Key Achievements:</h6><ul style="color:#64748b">${exp.achievements.map(a=>`<li style="margin-bottom:0.5rem">${esc(a)}</li>`).join('')}</ul></div>` : ''}
                                                </div>
                                                <div class="col-md-4 text-md-end">
                                                    <span class="badge" style="background:#667eea;color:white;font-size:0.9rem;padding:8px 15px;border-radius:20px">${esc(exp.duration)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </section>`;
        };

        const renderProjects = () => {
            if (!projects.length) return '';
            return `
                <section id="projects" style="padding:100px 0;background:#f8fafc">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Featured Projects</h2>
                            <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
                        </div>
                        <div class="row">
                            ${projects.map(project => `
                                <div class="col-lg-6 mb-5">
                                    <div class="card" style="border:none;box-shadow:0 20px 40px rgba(0,0,0,0.1);border-radius:20px;overflow:hidden;height:100%">
                                        <div style="position:relative">
                                            ${project.image ? `<img src="${esc(project.image)}" alt="${esc(project.title)}" style="width:100%;height:250px;object-fit:cover">` : ''}
                                            <div style="position:absolute;top:15px;right:15px;background:${project.status==='Live'?'#10b981':'#f59e0b'};color:white;padding:5px 15px;border-radius:20px;font-size:0.8rem;font-weight:600">${esc(project.status||'')}</div>
                                            ${project.featured?`<div style="position:absolute;top:15px;left:15px;background:#667eea;color:white;padding:5px 15px;border-radius:20px;font-size:0.8rem;font-weight:600">Featured</div>`:''}
                                        </div>
                                        <div class="card-body" style="padding:2.5rem">
                                            <h5 style="font-size:1.5rem;font-weight:700;color:#1e293b;margin-bottom:1rem">${esc(project.title)}</h5>
                                            <p style="color:#64748b;line-height:1.6;margin-bottom:1.5rem">${esc(project.description)}</p>
                                            <div style="margin-bottom:1.5rem">
                                                <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
                                                    ${(Array.isArray(project.tech) ? project.tech : (project.tech?project.tech.split(',').map(t=>t.trim()):[])).map(tech=>`<span style="background:#e2e8f0;color:#475569;font-size:0.8rem;padding:5px 10px;border-radius:15px">${esc(tech)}</span>`).join('')}
                                                </div>
                                            </div>
                                            ${project.metrics?`<div style="background:#f1f5f9;padding:1rem;border-radius:10px;margin-bottom:1.5rem"><div class="row text-center">${Object.entries(project.metrics).map(([k,v])=>`<div class="col"><div style="font-weight:700;color:#1e293b">${esc(v)}</div><div style="font-size:0.8rem;color:#64748b;text-transform:capitalize">${esc(k)}</div></div>`).join('')}</div></div>`:''}
                                            <div style="display:flex;gap:1rem">
                                                ${project.demo||project.liveLink?`<a class="btn" style="background:linear-gradient(135deg,#667eea,#764ba2);border:none;border-radius:25px;padding:8px 20px;color:white;text-decoration:none;font-weight:600" href="${esc(project.demo||project.liveLink)}" target="_blank" rel="noopener">🚀 Live Demo</a>`:''}
                                                ${project.github||project.githubLink?`<a class="btn btn-outline-secondary" style="border-radius:25px;padding:8px 20px;font-weight:600;text-decoration:none" href="${esc(project.github||project.githubLink)}" target="_blank" rel="noopener">📂 Code</a>`:''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderCertifications = () => {
            if (!certifications.length) return '';
            return `
                <section id="certifications" style="padding:100px 0;background:white">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Certifications & Credentials</h2>
                            <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
                        </div>
                        <div class="row">
                            ${certifications.map(cert=>`<div class="col-md-6 col-lg-4 mb-4"><div class="card" style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%"><div class="card-body" style="padding:2rem;text-align:center">${cert.image?`<img src="${esc(cert.image)}" alt="${esc(cert.name)}" style="width:100%;height:120px;object-fit:contain;background:#f8fafc;border-radius:10px;margin-bottom:1rem">`:''}<div style="width:80px;height:80px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:2rem;animation:float3d 5s ease-in-out infinite">🏆</div><h5 style="color:#1e293b;font-weight:700;margin-bottom:1rem;font-size:1.1rem">${esc(cert.name)}</h5><p style="color:#64748b;margin-bottom:1rem">${esc(cert.issuer)}</p><div style="margin-bottom:1rem"><span style="background:#10b981;color:white;padding:5px 15px;border-radius:15px">${esc(cert.date)}</span></div><div style="font-size:0.8rem;color:#94a3b8;margin-bottom:1rem">Valid until: ${esc(cert.validUntil)}</div>${cert.verifyLink?`<a class="btn btn-outline-primary" href="${esc(cert.verifyLink)}" target="_blank" rel="noopener" style="border-radius:20px">Verify Certificate</a>`:''}</div></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderEducation = () => {
            if (!education.length) return '';
            return `
                <section id="education" style="padding:100px 0;background:#f8fafc">
                    <div class="container">
                        <div class="text-center mb-5"><h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Education</h2><div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div></div>
                        <div class="row">${education.map(edu=>`<div class="col-md-6 mb-4"><div class="card" style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%"><div class="card-body" style="padding:2rem"><div style="width:80px;height:80px;background:linear-gradient(135deg,#10b981,#059669);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:2rem;animation:float3d 5s ease-in-out infinite">🎓</div><h5 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem;font-size:1.2rem">${esc(edu.degree)}</h5><h6 style="color:#667eea;font-weight:600;margin-bottom:1rem">${esc(edu.institution)}</h6><div style="margin-bottom:1rem"><span style="background:#3b82f6;color:white;padding:5px 15px;border-radius:15px;margin-right:10px">${esc(edu.duration)}</span>${edu.gpa?`<span style="background:#10b981;color:white;padding:5px 15px;border-radius:15px">GPA: ${esc(edu.gpa)}</span>`:''}</div>${edu.location?`<p style="color:#64748b;margin-bottom:1rem;font-size:0.9rem">📍 ${esc(edu.location)}</p>`:''}${edu.description?`<p style="color:#64748b;margin-bottom:1rem">${esc(edu.description)}</p>`:''}${edu.field?`<p style="color:#64748b;font-size:0.9rem"><strong>Field:</strong> ${esc(edu.field)}</p>`:''}</div></div></div>`).join('')}</div></div></section>`;
        };

        const renderInternships = () => {
            if (!internships.length) return '';
            return `
                <section id="internships" style="padding:100px 0;background:white">
                    <div class="container">
                        <div class="text-center mb-5"><h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">Internships & Early Experience</h2><div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div></div>
                        <div class="row">${internships.map(intern=>`<div class="col-md-6 mb-4"><div class="card" style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%"><div class="card-body" style="padding:2rem"><div style="width:80px;height:80px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:2rem;animation:float3d 5s ease-in-out infinite">🚀</div><h5 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem;font-size:1.2rem">${esc(intern.position)}</h5><h6 style="color:#667eea;font-weight:600;margin-bottom:1rem">${esc(intern.company)}</h6><div style="margin-bottom:1rem"><span style="background:#8b5cf6;color:white;padding:5px 15px;border-radius:15px">${esc(intern.duration)}</span></div>${intern.location?`<p style="color:#64748b;margin-bottom:1rem;font-size:0.9rem">📍 ${esc(intern.location)}</p>`:''}<p style="color:#64748b;margin-bottom:1.5rem">${esc(intern.description)}</p>${intern.achievements && intern.achievements.length?`<div><h6 style="color:#1e293b;font-weight:600;margin-bottom:0.5rem">Key Achievements:</h6><ul style="color:#64748b;padding-left:1.2rem">${intern.achievements.map(a=>`<li style="margin-bottom:0.3rem">${esc(a)}</li>`).join('')}</ul></div>`:''}</div></div></div>`).join('')}</div></div></section>`;
        };

        // main HTML
        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    /* copied animation + responsive styles from Template1 */
                    @keyframes float3d { 0%,100%{transform:translateY(0) rotateX(0) rotateY(0)}25%{transform:translateY(-10px) rotateX(5deg) rotateY(5deg)}50%{transform:translateY(-20px) rotateX(0) rotateY(10deg)}75%{transform:translateY(-10px) rotateX(-5deg) rotateY(5deg)} }
                    @keyframes rotate3d {0%{transform:rotateY(0) rotateX(0)}100%{transform:rotateY(360deg) rotateX(360deg)}}
                    @keyframes slideIn3d {0%{transform:translateX(-100px) rotateY(-90deg);opacity:0}100%{transform:translateX(0) rotateY(0);opacity:1}}
                    .card-3d{transform-style:preserve-3d;transition:transform .3s ease}
                    .card-3d:hover{transform:rotateY(10deg) rotateX(5deg) translateZ(20px)}
                    .profile-3d{animation:float3d 6s ease-in-out infinite;transform-style:preserve-3d}
                    .skill-bar-3d{transform-style:preserve-3d;transition:transform .3s ease}
                    .skill-bar-3d:hover{transform:translateZ(10px) rotateX(5deg)}
                    body{font-family:Inter, sans-serif;background:#f8fafc}
                    .hero{min-height:100vh;display:flex;align-items:center;padding-top:80px;color:white;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);position:relative;overflow:hidden}
                    .profile-img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:8px solid rgba(255,255,255,0.2);box-shadow:0 20px 40px rgba(0,0,0,0.3)}
                    @media (max-width:768px){.card-3d:hover{transform:none}.profile-3d{animation:none}.skill-bar-3d:hover{transform:none}.navbar-brand{font-size:1.2rem!important}.nav-link{padding:.75rem 1rem!important;text-align:center}.btn{margin:.25rem 0;width:100%}.container{padding-left:15px;padding-right:15px}.row{margin-left:-10px;margin-right:-10px}.col-md-4,.col-md-6,.col-md-8{padding-left:10px;padding-right:10px;margin-bottom:1rem}h1{font-size:2rem!important}h2{font-size:1.5rem!important}h3{font-size:1.25rem!important}.card{margin-bottom:1rem}.progress{height:8px}.badge{font-size:.75rem;margin:.125rem}}
                </style>
            </head>
            <body>
                ${renderNav()}
                <section id="top" class="hero">
                    <div style="position:absolute;top:20%;left:10%;width:100px;height:100px;background:rgba(255,255,255,0.08);border-radius:20px;animation:float3d 8s ease-in-out infinite"></div>
                    <div style="position:absolute;bottom:20%;right:15%;width:80px;height:80px;background:rgba(255,255,255,0.06);border-radius:50%;animation:float3d 6s ease-in-out infinite reverse"></div>
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-4 text-center">
                                <div class="profile-3d" style="width:260px;height:260px;margin:0 auto;position:relative">
                                    ${profileImage?`<img src="${esc(profileImage)}" alt="${esc(name)}" class="profile-img" style="width:260px;height:260px;border-radius:50%">`:`<div style="width:100%;height:100%;border-radius:50%;background:#e2e8f0"></div>`}
                                    <div style="position:absolute;bottom:14px;right:14px;background:#10b981;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:1rem;border:3px solid white;animation:float3d 4s ease-in-out infinite">✓</div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div style="animation:slideIn3d 1s ease-out">
                                    <h1 style="font-size:3rem;font-weight:700;margin-bottom:0.5rem;color:white;text-shadow:2px 2px 4px rgba(0,0,0,0.3)">${esc(name)}</h1>
                                    <h2 style="font-size:1.4rem;margin-bottom:0.6rem;opacity:.95;font-weight:500;color:rgba(255,255,255,0.95)">${esc(title)}</h2>
                                    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem">
                                        ${data.email?`<div style="background:rgba(255,255,255,0.12);padding:8px 12px;border-radius:10px;font-weight:600;color:white">✉️ ${esc(data.email)}</div>`:''}
                                        ${data.phone?`<div style="background:rgba(255,255,255,0.12);padding:8px 12px;border-radius:10px;font-weight:600;color:white">📱 ${esc(data.phone)}</div>`:''}
                                        ${data.location?`<div style="background:rgba(255,255,255,0.12);padding:8px 12px;border-radius:10px;font-weight:600;color:white">📍 ${esc(data.location)}</div>`:''}
                                    </div>
                                    <p style="font-size:1.05rem;margin-bottom:1.25rem;opacity:.9;line-height:1.6;color:rgba(255,255,255,0.92)">${esc(about)}</p>
                                    <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:0.75rem">
                                        <a class="btn btn-light btn-lg" href="#projects" style="font-weight:600;padding:12px 30px;border-radius:25px;text-decoration:none">View My Work</a>
                                        <a class="btn btn-outline-light btn-lg" href="#contact" style="font-weight:600;padding:12px 30px;border-radius:25px;text-decoration:none">Get In Touch</a>
                                    </div>
                                    <div style="display:flex;gap:1rem;margin-top:0.5rem">
                                        ${data.linkedin?`<a href="${esc(data.linkedin)}" target="_blank" rel="noopener noreferrer" style="color:white;font-size:1.25rem;opacity:.9">💼</a>`:''}
                                        ${data.github?`<a href="${esc(data.github)}" target="_blank" rel="noopener noreferrer" style="color:white;font-size:1.25rem;opacity:.9">🔗</a>`:''}
                                        ${data.website?`<a href="${esc(data.website)}" target="_blank" rel="noopener noreferrer" style="color:white;font-size:1.25rem;opacity:.9">🌐</a>`:''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" style="padding:100px 0;background:white">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <div class="text-center mb-5">
                                    <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem">About Me</h2>
                                    <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
                                </div>
                                <div class="card card-3d" style="border:none;box-shadow:0 20px 40px rgba(0,0,0,0.1);border-radius:20px">
                                    <div class="card-body" style="padding:3rem">
                                        <p style="font-size:1.2rem;line-height:1.8;color:#64748b;text-align:center">${esc(about)}</p>
                                        <div class="row mt-4 text-center">
                                            <div class="col-md-3"><div style="font-size:2rem;margin-bottom:.5rem">📍</div><div style="font-weight:600;color:#1e293b">${esc(data.location||'')}</div></div>
                                            <div class="col-md-3"><div style="font-size:2rem;margin-bottom:.5rem">💼</div><div style="font-weight:600;color:#1e293b">5+ Years</div></div>
                                            <div class="col-md-3"><div style="font-size:2rem;margin-bottom:.5rem">🏆</div><div style="font-weight:600;color:#1e293b">50+ Projects</div></div>
                                            <div class="col-md-3"><div style="font-size:2rem;margin-bottom:.5rem">⭐</div><div style="font-weight:600;color:#1e293b">Top Rated</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                ${renderSkills()}
                ${renderProjects()}
                ${renderInternships()}
                ${renderCertifications()}
                ${renderEducation()}

                <section id="contact" style="padding:100px 0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto text-center">
                                <h2 style="font-size:3rem;font-weight:700;margin-bottom:2rem">Let's Work Together</h2>
                                <p style="font-size:1.3rem;margin-bottom:3rem;opacity:.9">Ready to bring your ideas to life? Let's discuss your next project.</p>
                                <div style="display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;margin-bottom:3rem">
                                    <div class="card card-3d text-center" style="padding:1rem;border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px"><div style="font-size:2.5rem;margin-bottom:1rem">📧</div><div style="font-weight:600;font-size:1.1rem">${esc(data.email||'')}</div></div>
                                    <div class="card card-3d text-center" style="padding:1rem;border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px"><div style="font-size:2.5rem;margin-bottom:1rem">📱</div><div style="font-weight:600;font-size:1.1rem">${esc(data.phone||'')}</div></div>
                                    <div class="card card-3d text-center" style="padding:1rem;border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px"><div style="font-size:2.5rem;margin-bottom:1rem">📍</div><div style="font-weight:600;font-size:1.1rem">${esc(data.location||'')}</div></div>
                                </div>
                                <a class="btn btn-light btn-lg" href="mailto:${esc(data.email||'')}" style="font-weight:600;padding:15px 40px;border-radius:30px;font-size:1.1rem;text-decoration:none">Start a Conversation</a>
                            </div>
                        </div>
                    </div>
                </section>

                <footer style="background:#222;color:#fff;padding:30px;text-align:center">&copy; ${new Date().getFullYear()} ${esc(name)} - <a href="${getFrontendUrl()}" style="color:#bbb">Portfolio Generator</a></footer>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>`;
}

function generateTemplate2HTML(data = {}, meta = {}) {
        data = data || {};
        const name = data.name || 'Creative';
        const title = data.title || '';
    const about = data.about || '';
    const profileImage = data.profileImage || '';
    const projects = Array.isArray(data.projects) ? data.projects : (data.projects ? [data.projects] : []);
    const skills = Array.isArray(data.skills) ? data.skills : [];
    const experience = Array.isArray(data.experience) ? data.experience : (data.experience ? [data.experience] : []);
        const esc = s => (s===undefined||s===null)?'':String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const renderNav = () => `
            <nav style="background:rgba(255,255,255,0.78);backdrop-filter:blur(6px);border-bottom:1px solid rgba(0,0,0,0.04);position:sticky;top:0;z-index:1000">
                <div class="container d-flex align-items-center justify-content-between" style="padding:12px 0">
                    <div style="font-weight:700;font-size:1.05rem">${esc(name)}</div>
                    <div>
                        <a href="#top" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Profile</a>
                        <a href="#about" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">About</a>
                        <a href="#experience" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Experience</a>
                        <a href="#skills" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Skills</a>
                        <a href="#experience" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Experience</a>
                        <a href="#projects" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Projects</a>
                        <a href="#internships" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Internships</a>
                        <a href="#certifications" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Certifications</a>
                        <a href="#education" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Education</a>
                        <a href="#contact" style="margin-left:1rem;color:#111;text-decoration:none;font-weight:600">Contact</a>
                    </div>
                </div>
            </nav>`;

        const renderHero = () => `
            <section id="top" class="hero" style="padding:90px 0;text-align:center;position:relative">
                <div style="position:absolute;inset:0;pointer-events:none;opacity:0.06;background:radial-gradient(circle at 10% 20%,rgba(255,255,255,0.9),transparent 18%),linear-gradient(120deg,rgba(255,255,255,0.55),transparent 40%)"></div>
                <div class="container text-center">
                    ${profileImage?`<img class="profile-img mb-3" src="${esc(profileImage)}" alt="${esc(name)}" style="width:180px;height:180px;object-fit:cover;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,0.12)">`:''}
                    <h1 style="font-size:2.25rem;margin-bottom:.25rem;font-weight:700">${esc(name)}</h1>
                    <p style="font-size:1rem;opacity:.95;margin-bottom:.6rem">${esc(title)}</p>
                    <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-bottom:1rem">
                        ${data.email?`<div style="background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:10px;font-weight:600">✉️ ${esc(data.email)}</div>`:''}
                        ${data.phone?`<div style="background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:10px;font-weight:600">📱 ${esc(data.phone)}</div>`:''}
                        ${data.location?`<div style="background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:10px;font-weight:600">📍 ${esc(data.location)}</div>`:''}
                    </div>
                    <p style="max-width:760px;margin:0 auto;color:rgba(0,0,0,0.75);line-height:1.6">${esc(about)}</p>
                    <div style="margin-top:1rem">
                        <a class="cta" href="#about" style="background:#111;color:#fff;padding:9px 16px;border-radius:999px;font-weight:700;text-decoration:none">About</a>
                        <a class="cta" href="#projects" style="background:transparent;color:#111;border:2px solid rgba(0,0,0,0.06);padding:9px 16px;border-radius:999px;margin-left:0.6rem;text-decoration:none">Projects</a>
                    </div>
                </div>
            </section>`;

        const renderProjects = () => {
            const has = projects && projects.length;
            return `
                <section id="projects" style="padding:70px 0;background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))">
                    <div class="container">
                        <div class="text-center mb-5"><h2 style="font-size:2.5rem;font-weight:700;color:#0f172a">Featured Work</h2><div style="width:60px;height:4px;background:#ff6b6b;margin:0 auto;border-radius:3px"></div></div>
                        <div class="row g-4">
                            ${ has ? projects.map(p => `
                                <div class="col-md-6">
                                    <div class="card creative-card" style="border:none;box-shadow:0 16px 36px rgba(2,6,23,0.06);height:100%;border-radius:12px;overflow:hidden">
                                        <div style="position:relative">
                                            ${p.image?`<img src="${esc(p.image)}" style="width:100%;height:260px;object-fit:cover">`:''}
                                            <div class="creative-tag" style="position:absolute;top:12px;left:12px;background:rgba(255,255,255,0.95);padding:6px 10px;border-radius:10px;font-weight:700;color:#111">${esc(p.category||'')}</div>
                                        </div>
                                        <div class="card-body">
                                            <h5 style="margin-bottom:.5rem;font-weight:700;color:#0f172a">${esc(p.title)}</h5>
                                            <p style="color:#475569;margin-bottom:1rem">${esc(p.description)}</p>
                                            <div style="display:flex;gap:.5rem;flex-wrap:wrap">${(Array.isArray(p.tech)?p.tech:(p.tech?String(p.tech).split(',').map(t=>t.trim()):[])).map(t=>`<span class="tech-pill" style="background:#f1f5f9;padding:6px 10px;border-radius:12px;font-size:.85rem;color:#374151">${esc(t)}</span>`).join('')}</div>
                                            <div style="margin-top:1rem;display:flex;gap:.5rem">
                                                ${p.liveLink||p.demo?`<a class="cta" href="${esc(p.liveLink||p.demo)}" target="_blank" rel="noopener" style="background:#111;color:#fff;padding:8px 14px;border-radius:999px;text-decoration:none">Live</a>`:''}
                                                ${p.github||p.githubLink?`<a class="cta" href="${esc(p.github||p.githubLink)}" target="_blank" rel="noopener" style="background:transparent;color:#111;border:1px solid rgba(0,0,0,0.06);padding:8px 14px;border-radius:999px;text-decoration:none">Code</a>`:''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="col-12">
                                    <div style="background:#fff;padding:2rem;border-radius:12px;box-shadow:0 12px 30px rgba(2,6,23,0.04);text-align:center">
                                        <h4 style="margin-bottom:.5rem;color:#0f172a">No projects yet</h4>
                                        <p style="color:#475569;margin-bottom:1rem">Add projects in your portfolio data to showcase your work. In the meantime, this spot can highlight your featured project.</p>
                                        <div style="display:flex;gap:.5rem;justify-content:center">
                                            <a class="cta" href="#contact" style="background:#111;color:#fff;padding:8px 14px;border-radius:999px;text-decoration:none">Get Help Adding Projects</a>
                                        </div>
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>
                </section>`;
        };

        const renderExperience = () => {
            const exps = Array.isArray(data.experience) ? data.experience : (data.experience ? [data.experience] : []);
            if (!exps.length) return '';
            return `
                <section id="experience" style="padding:70px 0;background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.94))">
                    <div class="container">
                        <div class="text-center mb-5"><h2 style="font-size:2.25rem;font-weight:700;color:#0f172a">Experience</h2><div style="width:60px;height:4px;background:#ff6b6b;margin:0 auto;border-radius:3px"></div></div>
                        <div class="row g-4">
                            ${exps.map(e => `
                                <div class="col-md-6">
                                    <div style="background:#fff;padding:1.25rem;border-radius:12px;box-shadow:0 12px 30px rgba(2,6,23,0.04)">
                                        <div style="font-weight:700">${esc(e.position||e.role||'')}</div>
                                        <div style="color:#64748b">${esc(e.company||'')} • ${esc(e.duration||'')}</div>
                                        <p style="margin-top:.5rem;color:#334155">${esc(e.description||'')}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>`;
        };

    const renderSkills = () => {
            if (!skills.length) return '';
            return `
                <section id="skills" style="padding:70px 0;background:#fff">
                    <div class="container">
                        <div class="text-center mb-5"><h2 style="font-size:2.25rem;font-weight:700;color:#0f172a">Skills</h2></div>
                        <div class="row g-3">
                            ${skills.map(s => `<div class="col-6 col-md-3"><div style="background:#f8fafc;padding:1rem;border-radius:12px;text-align:center;box-shadow:0 8px 20px rgba(2,6,23,0.03)"><div style="font-size:1.7rem;margin-bottom:.5rem">${esc(s.icon||'💡')}</div><div style="font-weight:700;color:#0f172a">${esc(s.name||s)}</div><div style="color:#64748b;font-size:.85rem;margin-top:.35rem">${esc(s.level? s.level+'%':'' )}</div></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderAbout = () => {
            if (!about) return '';
            return `
                <section id="about" style="padding:80px 0;background:rgba(255,255,255,0.98)">
                    <div class="container">
                        <div class="text-center mb-4"><h2 style="font-size:2rem;font-weight:700;color:#0f172a">About</h2></div>
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div style="background:#fff;padding:2rem;border-radius:12px;box-shadow:0 12px 30px rgba(2,6,23,0.04)">
                                    <p style="color:#334155;line-height:1.7;font-size:1.05rem;margin:0">${esc(about)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`;
        };

        const renderCertifications = () => {
            const certs = Array.isArray(data.certifications) ? data.certifications : (data.certifications ? [data.certifications] : []);
            if (!certs.length) return '';
            return `
                <section id="certifications" style="padding:70px 0;background:#f8fafc">
                    <div class="container">
                        <div class="text-center mb-4"><h2 style="font-size:2rem;font-weight:700;color:#0f172a">Certifications</h2></div>
                        <div class="row g-4">
                            ${certs.map(c=>`<div class="col-md-4"><div style="background:#fff;padding:1.25rem;border-radius:12px;box-shadow:0 8px 20px rgba(2,6,23,0.03);text-align:center">${c.image?`<img src="${esc(c.image)}" style="width:100%;height:100px;object-fit:contain;margin-bottom:0.75rem">`:''}<div style="font-weight:700;color:#0f172a;margin-bottom:.25rem">${esc(c.name)}</div><div style="color:#64748b;font-size:.9rem">${esc(c.issuer||'')}</div>${c.verifyLink?`<div style="margin-top:.75rem"><a href="${esc(c.verifyLink)}" target="_blank" rel="noopener" style="text-decoration:none;color:#111;font-weight:700">Verify</a></div>`:''}</div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderEducation = () => {
            const ed = Array.isArray(data.education) ? data.education : (data.education ? [data.education] : []);
            if (!ed.length) return '';
            return `
                <section id="education" style="padding:70px 0;background:#fff">
                    <div class="container">
                        <div class="text-center mb-4"><h2 style="font-size:2rem;font-weight:700;color:#0f172a">Education</h2></div>
                        <div class="row g-4">
                            ${ed.map(e=>`<div class="col-md-6"><div style="background:#f8fafc;padding:1rem;border-radius:12px;box-shadow:0 8px 20px rgba(2,6,23,0.03)"><div style="font-weight:700">${esc(e.degree||'')}</div><div style="color:#64748b">${esc(e.institution||'')} • ${esc(e.duration||'')}</div><p style="margin-top:.5rem;color:#334155">${esc(e.description||'')}</p></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderInternships = () => {
            const interns = Array.isArray(data.internships) ? data.internships : (data.internships ? [data.internships] : []);
            if (!interns.length) return '';
            return `
                <section id="internships" style="padding:70px 0;background:linear-gradient(180deg,#fff,#f8fafc)">
                    <div class="container">
                        <div class="text-center mb-4"><h2 style="font-size:2rem;font-weight:700;color:#0f172a">Internships & Early Experience</h2></div>
                        <div class="row g-4">
                            ${interns.map(i=>`<div class="col-md-6"><div style="background:#fff;padding:1.25rem;border-radius:12px;box-shadow:0 8px 20px rgba(2,6,23,0.03)"><div style="font-weight:700">${esc(i.position||'')}</div><div style="color:#64748b">${esc(i.company||'')} • ${esc(i.duration||'')}</div><p style="margin-top:.5rem;color:#334155">${esc(i.description||'')}</p></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        // Compose
        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Creative Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
                <style>
                    :root{--accent-1:#ff6b6b;--accent-2:#feca57;--accent-3:#4ecdc4}
                    body{font-family:'Poppins',Inter,system-ui,Arial, sans-serif;margin:0;padding:0;background:linear-gradient(135deg,var(--accent-1),var(--accent-2) 40%,var(--accent-3));-webkit-font-smoothing:antialiased}
                    .hero{padding:90px 0;text-align:center;color:#0f172a}
                    .profile-img{width:180px;height:180px;object-fit:cover;border-radius:14px}
                    .creative-card{transition:transform .35s ease,box-shadow .25s ease;border-radius:12px}
                    .creative-card:hover{transform:translateY(-10px) rotateY(6deg);box-shadow:0 20px 40px rgba(2,6,23,0.08)}
                    .creative-tag{font-weight:700}
                    .cta{display:inline-block}
                    @media (max-width:768px){.hero{padding:48px 0}.profile-img{width:140px;height:140px}.creative-card:hover{transform:none}}
                </style>
            </head>
            <body>
                ${renderNav()}
                ${renderHero()}
                ${renderAbout()}
                ${renderSkills()}
                ${renderProjects()}
                ${renderInternships()}
                ${renderCertifications()}
                ${renderEducation()}
                <section id="contact" style="padding:60px 0;background:rgba(255,255,255,0.95);text-align:center">
                    <div class="container">
                        <h3 style="margin-bottom:.5rem;color:#0f172a">Let's Collaborate</h3>
                        <p style="max-width:720px;margin:0 auto 1rem;color:#454f5b">Interested in working together? Send a quick message and I’ll get back to you.</p>
                        <a class="cta" href="mailto:${esc(data.email||'')}">Email ${esc(name)}</a>
                    </div>
                </section>

                <section id="contact" style="padding:60px 0;background:rgba(255,255,255,0.95);text-align:center">
                    <div class="container">
                        <h3 style="margin-bottom:.5rem;color:#0f172a">Let's Collaborate</h3>
                        <p style="max-width:720px;margin:0 auto 1rem;color:#454f5b">Interested in working together? Send a quick message and I’ll get back to you.</p>
                        <a class="cta" href="mailto:${esc(data.email||'')}">Email ${esc(name)}</a>
                    </div>
                </section>

                <footer style="padding:28px 0;text-align:center;background:#111;color:#fff">&copy; ${new Date().getFullYear()} ${esc(name)} - <a href="${getFrontendUrl()}" style="color:#ddd;text-decoration:none">Portfolio Generator</a></footer>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </html>`;
}

function generateTemplate3HTML(data = {}, meta = {}) {
        data = data || {};
        const name = data.name || 'Business';
        const title = data.title || '';
        const about = data.about || '';
        const profileImage = data.profileImage || '';
        const experience = Array.isArray(data.experience) ? data.experience : (data.experience ? [data.experience] : []);
        const projects = Array.isArray(data.projects) ? data.projects : [];
        const esc = s => (s===undefined||s===null)?'':String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const renderNav = () => `
            <nav style="background:#0f172a;color:#fff;padding:12px 0;position:sticky;top:0;z-index:1000">
                <div class="container d-flex justify-content-between align-items-center">
                    <div style="font-weight:700">${esc(name)}</div>
                    <div>
                        <a href="#about" style="color:#cbd5e1;margin-left:1rem;text-decoration:none">About</a>
                        <a href="#experience" style="color:#cbd5e1;margin-left:1rem;text-decoration:none">Experience</a>
                        <a href="#projects" style="color:#cbd5e1;margin-left:1rem;text-decoration:none">Projects</a>
                    </div>
                </div>
            </nav>`;

        const renderHero = () => `
            <header style="background:linear-gradient(135deg,#1e3c72,#2a5298);color:#fff;padding:60px 0">
                <div class="container">
                    <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap">
                        ${profileImage?`<img src="${esc(profileImage)}" style="width:140px;height:140px;border-radius:8px;object-fit:cover">`:''}
                        <div>
                            <h1 style="margin:0">${esc(name)}</h1>
                            <p style="opacity:.9;margin:0">${esc(title)}</p>
                        </div>
                    </div>
                </div>
            </header>`;

        const renderAbout = () => about ? `
            <section id="about" style="padding:60px 0;background:#fff">
                <div class="container"><div class="row"><div class="col-lg-10 mx-auto"><h2 style="font-weight:700">About</h2><p style="color:#334155">${esc(about)}</p></div></div></div>
            </section>` : '';

        const renderExperience = () => {
            if (!experience.length) return '';
            return `
                <section id="experience" style="padding:50px 0;background:#f8fafc">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 mx-auto">
                                <h2 style="font-weight:700">Professional Experience</h2>
                                ${experience.map(exp=>`<div style="margin-bottom:1.25rem"><h5 style="margin:0">${esc(exp.position)} <small style="color:#667eea">@ ${esc(exp.company)}</small></h5><div style="color:#475569">${esc(exp.duration)} • ${esc(exp.location)}</div><p style="color:#334155">${esc(exp.description)}</p></div>`).join('')}
                            </div>
                        </div>
                    </div>
                </section>`;
        };

        const renderProjects = () => {
            if (!projects.length) return '';
            return `
                <section id="projects" style="padding:60px 0;background:#fff">
                    <div class="container">
                        <h2 style="font-weight:700;text-align:center;margin-bottom:1.5rem">Selected Projects</h2>
                        <div class="row g-4">
                            ${projects.map(p=>`<div class="col-md-6"><div style="border-radius:12px;box-shadow:0 12px 30px rgba(2,6,23,0.04);overflow:hidden;background:#fff"><div style="position:relative">${p.image?`<img src="${esc(p.image)}" style="width:100%;height:220px;object-fit:cover">`:''}</div><div style="padding:1.25rem"><h5 style="margin:0">${esc(p.title)}</h5><p style="color:#475569;margin-top:.5rem">${esc(p.description)}</p></div></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderContact = () => `
            <section id="contact" style="padding:60px 0;background:linear-gradient(180deg,#fff,#f8fafc);text-align:center">
                <div class="container">
                    <h3 style="font-weight:700">Get in touch</h3>
                    <p style="color:#475569">${esc(data.email||'')} • ${esc(data.phone||'')} • ${esc(data.location||'')}</p>
                </div>
            </section>`;

        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Business Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>body{font-family:Georgia,serif;background:#fff;color:#111}@media(max-width:768px){header div{flex-direction:column}}</style>
            </head>
            <body>
                ${renderNav()}
                ${renderHero()}
                ${renderAbout()}
                ${renderExperience()}
                ${renderProjects()}
                ${renderContact()}
                <footer style="padding:30px 0;text-align:center;background:#fafafa;color:#333">&copy; ${new Date().getFullYear()} ${esc(name)}</footer>
            </body>
        </html>`;
}

function generateTemplate4HTML(data = {}, meta = {}) {
        data = data || {};
        const name = data.name || 'Minimal';
        const title = data.title || '';
        const about = data.about || '';
        const profileImage = data.profileImage || '';
        const projects = Array.isArray(data.projects) ? data.projects : [];
        const esc = s => (s===undefined||s===null)?'':String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const renderNav = () => `
            <nav style="padding:14px 0;position:sticky;top:0;background:#fff;border-bottom:1px solid #f1f5f9">
                <div class="container d-flex justify-content-between align-items-center">
                    <div style="font-weight:600">${esc(name)}</div>
                    <div><a href="#projects" style="text-decoration:none;color:#111;margin-left:1rem">Projects</a></div>
                </div>
            </nav>`;

        const renderHero = () => `
            <section class="hero text-center" style="padding:100px 0">
                <div class="container">
                    ${profileImage?`<img class="profile-img mb-4" src="${esc(profileImage)}" alt="${esc(name)}" style="width:300px;height:300px;object-fit:cover;border-radius:0">`:''}
                    <h1 style="font-weight:100;font-size:3.5rem">${esc(name)}</h1>
                    <p style="opacity:.8">${esc(title)}</p>
                    ${about?`<p style="max-width:700px;margin:1rem auto;color:#444">${esc(about)}</p>`:''}
                </div>
            </section>`;

        const renderProjects = () => {
            if (!projects.length) return '';
            return `
                <section id="projects" style="padding:60px 0;background:#fff">
                    <div class="container">
                        <div class="row g-4">
                            ${projects.map(p=>`<div class="col-md-6"><div style="padding:1.25rem;border-radius:8px;border:1px solid #f1f5f9"><h5 style="margin:0">${esc(p.title)}</h5><p style="color:#475569">${esc(p.description)}</p></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderContact = () => `
            <section id="contact" style="padding:60px 0;text-align:center;background:#fff">
                <div class="container"><p style="color:#475569">${esc(data.email||'')}</p></div>
            </section>`;

        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Minimal Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>body{font-family:Inter,system-ui,Arial,sans-serif;background:#fff;color:#000}@media(max-width:768px){.profile-img{width:180px;height:180px}h1{font-size:2rem}}</style>
            </head>
            <body>
                ${renderNav()}
                ${renderHero()}
                ${renderProjects()}
                ${renderContact()}
            </body>
        </html>`;
}

function generateTemplate5HTML(data = {}, meta = {}) {
        data = data || {};
        const name = data.name || 'Developer';
        const title = data.title || '';
        const about = data.about || '';
        const profileImage = data.profileImage || '';
        const projects = Array.isArray(data.projects)?data.projects:[];
        const esc = s => (s===undefined||s===null)?'':String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const renderNav = () => `
            <nav style="padding:12px 0;background:#0b1220;color:#c9d1d9;position:sticky;top:0;z-index:1000">
                <div class="container d-flex justify-content-between align-items-center"><div style="font-weight:700">${esc(name)}</div><div><a href="#projects" style="color:#c9d1d9;margin-left:1rem;text-decoration:none">Projects</a></div></div>
            </nav>`;

        const renderHero = () => `
            <section style="padding:80px 0;background:#0d1117;color:#c9d1d9;text-align:center">
                <div class="container">
                    ${profileImage?`<img src="${esc(profileImage)}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;margin-bottom:1rem">`:''}
                    <h1 style="margin:0">${esc(name)}</h1>
                    <p style="opacity:.8">${esc(title)}</p>
                    <div style="max-width:800px;margin:1.25rem auto;color:#9ba6b2">${esc(about)}</div>
                </div>
            </section>`;

        const renderTerminal = () => `
            <section style="padding:40px 0;background:#010409;color:#58a6ff;text-align:left">
                <div class="container"><pre style="margin:0;font-family:inherit;font-size:0.95rem;padding:1rem;border-radius:8px;background:#010409;color:#58a6ff">// Sample interactive preview\nconsole.log('Hello, I build software.');</pre></div>
            </section>`;

        const renderProjects = () => {
            if (!projects.length) return '';
            return `
                <section id="projects" style="padding:60px 0;background:#0b1220;color:#c9d1d9">
                    <div class="container">
                        <h2 style="text-align:center;margin-bottom:1rem;color:#c9d1d9">Projects</h2>
                        <div class="row g-4">
                            ${projects.map(p=>`<div class="col-md-6"><div style="background:#07101a;padding:1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.03)"><h5 style="margin:0;color:#c9d1d9">${esc(p.title)}</h5><p style="color:#9ba6b2">${esc(p.description)}</p></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;
        };

        const renderContact = () => `
            <section id="contact" style="padding:50px 0;background:#0d1117;text-align:center;color:#c9d1d9">
                <div class="container"><a href="mailto:${esc(data.email||'')}" style="color:#58a6ff;text-decoration:none;font-weight:700">Email ${esc(name)}</a></div>
            </section>`;

        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Developer Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>body{font-family:'Fira Code',monospace;background:#0d1117;color:#c9d1d9}pre{white-space:pre-wrap}</style>
            </head>
            <body>
                ${renderNav()}
                ${renderHero()}
                ${renderTerminal()}
                ${renderProjects()}
                ${renderContact()}
            </body>
        </html>`;
}

function generateTemplate6HTML(data = {}, meta = {}) {
        data = data || {};
        const name = data.name || 'Marketing';
        const title = data.title || '';
        const about = data.about || '';
        const profileImage = data.profileImage || '';
        const projects = Array.isArray(data.projects)?data.projects:[];
        const esc = s => (s===undefined||s===null)?'':String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');

        const renderNav = () => `
            <nav style="padding:12px 0;background:#ffffff;position:sticky;top:0;z-index:1000;border-bottom:1px solid #eef2f7">
                <div class="container d-flex justify-content-between align-items-center"><div style="font-weight:700">${esc(name)}</div><div><a href="#projects" style="margin-left:1rem;text-decoration:none;color:#111">Projects</a></div></div>
            </nav>`;

        const renderHero = () => `
            <section class="hero" style="padding:80px 0;text-align:center;background:#f4f6f8">
                <div class="container">
                    ${profileImage?`<img class="profile-img mb-4" src="${esc(profileImage)}" alt="${esc(name)}" style="width:180px;height:180px;object-fit:cover;border-radius:8px">`:''}
                    <h1 style="margin-bottom:.25rem">${esc(name)}</h1>
                    <p style="opacity:.8;margin-bottom:1rem">${esc(title)}</p>
                    <p style="max-width:720px;margin:0 auto;color:#555">${esc(about)}</p>
                    <div class="stats mt-4" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                        <div class="stat" style="background:white;padding:1rem 1.5rem;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.06);min-width:130px"><div style="font-weight:700;font-size:1.25rem">${esc(data.projects && data.projects.length?data.projects.length:'0')}</div><div style="color:#666">Projects</div></div>
                        <div class="stat" style="background:white;padding:1rem 1.5rem;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.06);min-width:130px"><div style="font-weight:700;font-size:1.25rem">${esc(data.clients||'—')}</div><div style="color:#666">Clients</div></div>
                        <div class="stat" style="background:white;padding:1rem 1.5rem;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.06);min-width:130px"><div style="font-weight:700;font-size:1.25rem">${esc(data.revenue||'—')}</div><div style="color:#666">Revenue</div></div>
                    </div>
                </div>
            </section>`;

        const renderProjects = () => `
                <section id="projects" style="padding:60px 0;background:white">
                    <div class="container">
                        <div class="row g-4">
                            ${projects.map(p=>`<div class="col-md-6"><div class="card" style="border:none;box-shadow:0 12px 30px rgba(0,0,0,0.05);border-radius:12px;overflow:hidden"><img src="${esc(p.image||'')}" style="width:100%;height:200px;object-fit:cover"> <div class="card-body"><h5 style="margin:0">${esc(p.title)}</h5><p style="color:#666;margin-top:.5rem">${esc(p.description)}</p></div></div></div>`).join('')}
                        </div>
                    </div>
                </section>`;

        const renderContact = () => `
            <section id="contact" style="padding:60px 0;text-align:center;background:#fff">
                <div class="container"><p style="color:#475569">Contact: ${esc(data.email||'')}</p></div>
            </section>`;

        return `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${esc(meta.title) || esc(name + ' - Portfolio')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>body{font-family:Inter,system-ui;background:#f4f6f8;color:#111}.profile-img{width:180px;height:180px;object-fit:cover;border-radius:8px}@media(max-width:768px){.profile-img{width:140px;height:140px}}</style>
            </head>
            <body>
                ${renderNav()}
                ${renderHero()}
                ${renderProjects()}
                ${renderContact()}
                <footer style="padding:30px 0;text-align:center;background:#f8fafc;color:#333">&copy; ${new Date().getFullYear()} ${esc(name)}</footer>
            </body>
        </html>`;
}

// Dispatcher
function generatePortfolioHTML(portfolio) {
    let { data = {}, meta = {}, templateId = 'template1' } = portfolio || {};
    // ensure urls in production
    if (process.env.NODE_ENV === 'production') data = ensureDataUrls(data);
    switch (templateId) {
        case 'template1': return generateTemplate1HTML(data, meta);
        case 'template2': return generateTemplate2HTML(data, meta);
        case 'template3': return generateTemplate3HTML(data, meta);
        case 'template4': return generateTemplate4HTML(data, meta);
        case 'template5': return generateTemplate5HTML(data, meta);
        case 'template6': return generateTemplate6HTML(data, meta);
        default: return generateTemplate1HTML(data, meta);
    }
}

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

// quick test route
app.get('/portfolio/test', (req, res) => {
    const templateId = req.query.template || 'template1';
    const sample = {
        data: {
            name: 'Sample User',
            title: 'Full Stack Developer',
            about: `This is a server-side rendered sample of ${templateId}.`,
            profileImage: '',
            skills: [{ name: 'JS', level: 90 }, { name: 'React', level: 95 }]
        },
        meta: { title: 'Sample User - Portfolio' },
        templateId: templateId
    };
    res.send(generatePortfolioHTML(sample));
});

// Public portfolio route (tries DB, falls back to sample)
app.get('/portfolio/:slug', async (req, res) => {
    const slug = req.params.slug;
    if (mongooseConnected) {
        try {
            const Portfolio = require('./model/Portfolio');
            const p = await Portfolio.findOne({ slug, isPublished: true }).lean();
            if (!p) return res.status(404).send('<h1>Not found</h1>');
            return res.send(generatePortfolioHTML(p));
        } catch (e) {
            console.error('DB fetch error:', e.message || e);
        }
    }
    // fallback: return sample using slug in title
    const fallback = { data: { name: slug || 'Unknown', title: 'Portfolio', about: 'Published via server fallback.' }, meta: { title: `${slug} - Portfolio` }, templateId: 'template1' };
    res.send(generatePortfolioHTML(fallback));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (r) => { console.error('UnhandledRejection', r); setTimeout(()=>process.exit(1),100); });
process.on('uncaughtException', (e) => { console.error('UncaughtException', e); setTimeout(()=>process.exit(1),100); });

