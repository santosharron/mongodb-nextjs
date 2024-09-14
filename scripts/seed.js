// seed.js

const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://santosharron:xt9pdfEpgHI1UIHU@cluster0.bumtdlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update this as necessary

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db('cuvette'); // Replace with your database name
    const jobsCollection = db.collection('jobs'); // Replace with your collection name

    const fakeJobs = [
        {
          title: 'Software Engineer',
          company: 'Tech Innovators',
          location: 'San Francisco',
          skills: ['JavaScript', 'React.js', 'Node.js'],
          imageUrl: 'https://randomwordgenerator.com/img/picture-generator/pawel-czerwinski-yRgZunFGRSU-unsplash.jpg',
          immediateStartDate: '01-04-2024',
          jobOpenings: '3',
          url: 'https://www.linkedin.com/in/santoshvp',
          salaryRange: '3 LPA',
          experienceLevel: '3-5 years',
          probationDuration: '3 Months',
        },
        {
          title: 'Data Scientist',
          company: 'Data Insights Inc.',
          location: 'New York',
          skills: ['Python', 'Machine Learning', 'SQL'],
          imageUrl: 'https://randomwordgenerator.com/img/picture-generator/52e4d2444a53b10ff3d8992cc12c30771037dbf85254794e732f7bd69144_640.jpg',
          immediateStartDate: '01-11-2024',
          jobOpenings: '2',
          url: 'https://www.linkedin.com/in/santoshvp',
          salaryRange: '12 LPA',
          experienceLevel: '2-4 years',
          probationDuration: '6 Months',
        },
        {
          title: 'Product Manager',
          company: 'Product Masters',
          location: 'Seattle',
          skills: ['Agile', 'Product Development', 'Communication'],
          imageUrl: 'https://randomwordgenerator.com/img/picture-generator/57e2d1464d56a414f1dc8460962e33791c3ad6e04e50744172287cd19649c5_640.jpg',
          immediateStartDate: '15-10-2024',
          jobOpenings: '4',
          url: 'https://www.linkedin.com/in/santoshvp',
          salaryRange: '5 LPA',
          experienceLevel: '5-7 years',
          probationDuration: '4 Months',
        },
        {
          title: 'UX Designer',
          company: 'Design Wizards',
          location: 'Austin',
          skills: ['Adobe XD', 'Figma', 'User Research'],
          imageUrl: 'https://randomwordgenerator.com/img/picture-generator/52e0d4404e56a514f1dc8460962e33791c3ad6e04e507440772d7cdd9245c3_640.jpg',
          immediateStartDate: '30-09-2024',
          jobOpenings: '5',
          url: 'https://www.linkedin.com/in/santoshvp',
          salaryRange: '6 LPA',
          experienceLevel: '1-3 years',
          probationDuration: '8 Months',
        },
        {
          title: 'Marketing Specialist',
          company: 'Market Leaders',
          location: 'Chicago',
          skills: ['SEO', 'Content Marketing', 'Analytics'],
          imageUrl: 'https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg',
          immediateStartDate: '01-12-2024',
          jobOpenings: '3',
          url: 'https://www.linkedin.com/in/santoshvp',
          salaryRange: '8 LPA',
          experienceLevel: '3-5 years',
          probationDuration: '8 Months',
        },
      ];      

    const result = await jobsCollection.insertMany(fakeJobs);
    console.log(`${result.insertedCount} documents were inserted`);

  } catch (err) {
    console.error('Error connecting to the database or inserting data', err);
  } finally {
    await client.close();
  }
}

seedDatabase();
