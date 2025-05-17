// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Implementing the filter logic
    let results = courses.filter(course => course.department === dept);

    // Defesnsive check: if minCredits > maxCredits
    const min = minCredits ? parseInt(minCredits) : null;
    const max = maxCredits ? parseInt(maxCredits) : null;

    if (min != null && max != null && min > max) {
        return res.status(400).json({ error: 'Invalid credit range: minCredits > maxCredits'});
    }

    // Apply query filters
    if (level) {
        results = results.filter(course => course.level === level);
    }
    if (min != null) {
        results = results.filter(course => course.credits >= min);
    }
    if (max != null) {
        results = results.filter(course => course.credits <= max);
    }
    if (semester) {
        results = results.filter(course => course.semester === semester);
    }
    if (instructor) {
        results = results.filter(course => 
            course.instructor.toLowerCase().includes(instructor.toLocaleLowerCase())
        );
    }

    // Response format
    res.join({
        results,
        meta: {
            total: results.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
