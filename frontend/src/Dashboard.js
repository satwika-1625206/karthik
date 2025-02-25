import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
import { withRouter } from './utils';
const axios = require('axios');
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <h2 className="text-2xl mt-2">Karthik Rao</h2>
      <p className="mt-4">
        A passionate and dedicated software developer currently pursuing my B.Tech in Computer Science and Engineering at GITAM University Hyderabad. With a strong foundation in web development and programming, I specialize in creating modern, efficient, and user-friendly applications.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Contact Me</h2>
        <p>Email: <a href="mailto:Karthikambeer4@gmail.com" className="text-blue-600">Karthikambeer4@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/ambeer-karthik-800b13301/" className="text-blue-600" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
        <p>GitHub: <a href="https://github.com/Karthik-f1" className="text-blue-600" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Education</h2>
        <p><strong>B.Tech in Computer Science and Engineering</strong><br/>GITAM University Hyderabad (2023 - Present)<br/>CGPA: 7.4/10</p>
        <p className="mt-2"><strong>Intermediate Education (10+2)</strong><br/>Sri Gaythri Junior College (2021 - 2023)<br/>Percentage: 80%</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <p><strong>Dyslexia Prediction</strong> (August 2023)</p>
        <p>Developed a logistic regression model integrated into a quiz-based website for predicting dyslexia.</p>
        <p>Tech Stack: Python (Machine Learning), HTML, CSS</p>

        <p className="mt-4"><strong>The Machine Man</strong> (January 2023)</p>
        <p>Developed a Python-based job scheduling system for optimizing business orders for cobblers.</p>
        <p>Tech Stack: Python, Tkinter GUI</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Technical Skills</h2>
        <ul className="list-disc pl-6">
          <li>Python</li>
          <li>Machine Learning</li>
          <li>HTML/CSS</li>
          <li>GUI Development</li>
          <li>JavaScript</li>
          <li>SQL</li>
          <li>Git</li>
          <li>Web Development</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Resume</h2>
        <p>
          <a href="https://drive.google.com/file/d/1tWPGOaY5oDxYsZ_NmvUDOoV_JdRAP6Ix/view?usp=sharing" className="text-blue-600" target="_blank" rel="noopener noreferrer">
            View Resume (PDF)
          </a>
        </p>
      </div>
    </div>
  );
};



export default withRouter(Dashboard);
