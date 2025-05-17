import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Fix _dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse from data
app.use(bodyParser.urlencoded({ extended: true}));

// Route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    res.send(`
        <form method='POST' action="contact">
            <input type='text' name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req,res) => {
    const name = req.body.name?.trim();

    if (!name) {
        return res.status(400).send(`
            <h2>Submission falied</h2>
            <p>Name field cannot be empty.</p>
            <a href="/contact">Go back</a>    
        `);
    }

    const filePath = path.join(__dirname, 'submissions.json');
 
    // Read existing submissions 
    fs.readFile(filePath, 'utf8', (err, data) => {
        let submissions = [];

        if (!err && data) {
            try {
                submissions = JSON.parse(date);
            } catch (parserErr) {
                console.error('Error parsing JSON:', parserErr);
            }
        }

        submissions.push({ name });

        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), err => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send(`<h2>Server error</h2><p>Try again later.</p>`);
            }

            res.send(`
                <h2>Thank you, ${name}!</h2>
                <p>Your submission has been received.</p>
                <a href="/contact">Submit another</a>
            `);
        });
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
