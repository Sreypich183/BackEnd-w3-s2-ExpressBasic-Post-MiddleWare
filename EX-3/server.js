// server.js
import express from 'express';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import authenticate from './auth.js';
const app = express();
const port = 3000;

// Apply global middleware
app.use(logger);

const courses = [
    { code: "CS101", title: "Intro to CS", credits: 3},
    { code: "CS102", title: "Algorithms", credits: 4},
    { code: "CS103", title: "Data Strutures", credits: 5},
];

// Apply middleware to this specific route
app.get("/departments/:dept/courses", authenticate, validateQuery, (req, res) => {
    const { minCredits, maxCredits } = req.query;
    let filertedCourses = [...courses];

    if (minCredits) {
        filertedCourses = filertedCourses.filter(
            (course) => course.credits >= parseInt(minCredits)
        );
    }

    if (maxCredits) {
        filertedCourses = filertedCourses.filter(
            (course) => course.credits <= parseInt(maxCredits)
        );
    }

    res.json({ department: req.params.dept, courses: filertedCourses });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
