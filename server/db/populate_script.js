// Import database
const { db } = require('./index');

// Function to create tables
const createTables = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS USER (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                sex TEXT NOT NULL,
                university TEXT NOT NULL,
                city TEXT NOT NULL,
                email TEXT NOT NULL,
                degree TEXT NOT NULL,
                major TEXT NOT NULL,
                course TEXT NOT NULL, 
                language TEXT NOT NULL,
                phoneNumber TEXT
            )`, (err) => {
                if (err) {
                    reject(err);
                }
                db.run(`CREATE TABLE IF NOT EXISTS MENTOR(
                    mid INTEGER PRIMARY KEY AUTOINCREMENT,
                    uid INTEGER NOT NULL REFERENCES USER(id),
                    mentorCourses TEXT NOT NULL,
                    year TEXT NOT NULL
                )`, (err) => {
                    if (err) {
                        reject(err);
                    }
                    db.run(`CREATE TABLE IF NOT EXISTS RELATIONSHIP (
                        uid1 INTEGER NOT NULL REFERENCES USER(id),
                        uid2 INTEGER NOT NULL REFERENCES USER(id),
                        type INTEGER NOT NULL,
                        PRIMARY KEY (uid1,uid2,type)
                    )`, (err) => {
                        if (err) {
                            reject(err);
                        }
                        db.run(`CREATE TABLE IF NOT EXISTS MESSAGE (
                            uid1 INTEGER NOT NULL REFERENCES USER(id),
                            uid2 INTEGER NOT NULL REFERENCES USER(id),
                            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                            type INTEGER NOT NULL,
                            text TEXT NOT NULL,
                            PRIMARY KEY (uid1,timestamp)
                        )`, (err) => {
                            if (err) {
                                reject(err);
                            }
                            db.run(`CREATE TABLE IF NOT EXISTS TIMESLOTS (
                                uid INTEGER NOT NULL REFERENCES USER(id),
                                timeslot TEXT NOT NULL,
                                PRIMARY KEY (uid)
                            )`, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                resolve();
                            });
                        });
                    });
                });
            });


        });
    });
};

// Function to empty the tables
const emptyTables = () => {
    return new Promise((resolve, reject) => {
        try {
            db.serialize(() => {
                db.run('DELETE FROM TIMESLOTS');
                db.run('DELETE FROM MESSAGE');
                db.run('DELETE FROM RELATIONSHIP');
                db.run('DELETE FROM MENTOR');
                db.run('DELETE FROM USER');

                resolve();
            })
        }
        catch (error) {
            reject(error);
        }
    });
}

// Function to insert data
const insertData = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Insert data for each table
            const insertUserData = () => {
                // Sample data to be inserted into the table
                const usersData = [
                    [1, 'John Doe', 'M', 'Turin', 'Polytechnic of Turin', 'john@studenti.polito.com', 'Computer Engineering', 'Software Applications', 'English', 'Software Engineering, Database', '1234567890'],
                    [2, 'Alice Smith', 'F', 'Turin', 'Polytechnic of Turin', 'alice@studenti.polito.com', 'Architecture', 'Heritage', 'Italian', 'Management of design', '1234567890'],
                    [3, 'Carlos Garcia', 'M', 'Turin', 'Polytechnic of Turin', 'carlos@studenti.polito.com', 'Computer Engineering', 'Network', 'English, Italian, Spanish', 'Web Applications, HCI, Software Engeneering, Database', '1234567890'],
                    [4, 'Ling Wang', 'F', 'Turin', 'University of Turin', 'ling@studenti.polito.com', 'Architecture', 'Sustainability', 'Italian', 'Management of design', '1234567890'],
                    [5, 'Raj Gupta', 'M', 'Turin', 'University of Turin', 'raj@studenti.polito.com', 'Architecture', 'Sustainability', 'English', 'History of architecture, Management of design', '1234567890'],
                    [6, 'Giovanni Mela', 'M', 'Milan', 'University of Milan', 'raj@studenti.unimi.com', 'Computer Science', 'Artificial Intelligence', 'Italian', 'HCI, Information Security', '1234567890'],
                    [7, 'John Frog', 'M', 'New York', 'University of New York', 'john@students.nyu.com', 'Chemistry', 'Food Chemistry', 'English', 'Organic Chemistry, Materials Science, Biology', '1234567890'],
                    [8, 'Carolina Bell', 'F', 'Chicago', 'University of Chicago', 'carolina@students.uc.com', 'Businness', 'Finance', 'English', 'Calculus 1, Businness Administration, Law for Businness', '1234567890'],
                    [9, 'Adam Zhu', 'M', 'New York', 'University of New York', 'adam@students.nyu.com', 'Chemistry', 'Industrial Chemistry', 'English, Chinese', 'Biology', '1234567890'],
                    [10, 'Laure Costa', 'F', 'Chicago', 'University of Chicago', 'laure@students.uc.com', 'Law', 'Businness', 'English', 'Law for Businness', '1234567890'],
                    [11, 'Giovanna Costa', 'F', 'Florence', 'University of Florence', 'giovanna@studenti.unifi.com', 'Graphic Design', 'Communication', 'English, Italian, French', 'HCI, Marketing, Color Psychology, SEO', '1234567890'],
                    [12, 'Luigi Rondi', 'M', 'Florence' , 'University of Florence', 'giovanna@studenti.unifi.com', 'Marketing', 'Digital Marketing', 'English, Italian', 'Marketing, Color Psychology, SEO, French Language, Communication', '1234567890'],
                    [13, 'Luis Smith', 'M', 'Turin' , 'University of Turin', 'luis@studenti.unito.com', 'Marketing', 'Digital Marketing', 'English, Italian, Spanish', 'Marketing, Color Psychology, SEO, French Language, Communication, HCI', '1234567890'],
                    
                ];

                const stmt = db.prepare('INSERT INTO USER (id, name, sex, city, university, email, degree, major, language, course, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                usersData.forEach(user => {
                    stmt.run(user, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                stmt.finalize();

            };

            const insertRelationshipData = () => {
                // Sample data to be inserted into the table, useful for final demonstration (not test)
                const relationshipsData = [
                    [1, 2, 1],
                    [2, 3, 1],
                    [3, 4, 2],
                    [4, 5, 2],
                    [5, 6, 1],
                ]; //1: student-student, 2: uid1 teacher of uid2

                const stmt = db.prepare('INSERT INTO RELATIONSHIP (uid1, uid2, type) VALUES (?, ?, ?)');
                relationshipsData.forEach(rel => {
                    stmt.run(rel, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                stmt.finalize();

            };

            const insertTimetableData = () => {

                const timetablesData = [
                    [1, '{}'],
                    [2, '{}'],
                    [3, '{}'],
                    [4, '{}'],
                    [5, '{}'],
                    [6, '{}'],
                    [7, '{}'],
                    [8, '{}'],
                    [9, '{}'],
                    [10, '{}'],
                    [11, '{}'],
                    [12, '{}'],
                    [13, '{}']
                ];

                const stmt = db.prepare('INSERT INTO TIMESLOTS (uid, timeslot) VALUES (?, ?)');
                timetablesData.forEach(t => {
                    stmt.run(t, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                stmt.finalize();
            };

            insertUserData();
            //insertRelationshipData();
            insertTimetableData();

            resolve();
        });
    });
};

// Function to populate the database
const populateDatabase = async () => {
    try {
        await createTables(); // Create tables first
        console.log("Tables created if they were not present");
        await emptyTables(); // Cleans the tables
        console.log("Cleaned tables");
        await insertData(); // Insert data once tables are created
        console.log("Entries inserted");

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Database populated successfully!');
            }
        });

        console.log("ok");
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

// Start populating the database
populateDatabase();