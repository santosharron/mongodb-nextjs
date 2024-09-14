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
          company: 'Lowes India',
          location: 'San Francisco',
          skills: ['JavaScript', 'React.js', 'Node.js'],
          imageUrl: 'https://media.licdn.com/dms/image/v2/C4E0BAQHoNPNGRZYG-w/company-logo_100_100/company-logo_100_100/0/1630617454317/lowes_india_logo?e=1734566400&v=beta&t=jdCF4ERdE7GZYENJXus1zH-7GmqCLe0zgaBNp9wQPZE',
          immediateStartDate: '01-04-2024',
          jobOpenings: '3',
          url: 'https://www.linkedin.com/jobs/view/4024154209',
          salaryRange: '3 LPA',
          experienceLevel: '3-5 years',
          probationDuration: '3 Months',
        },
        {
          title: 'Data Scientist',
          company: 'Deloitte',
          location: 'New York',
          skills: ['Python', 'Machine Learning', 'SQL'],
          imageUrl: 'https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_100_100/company-logo_100_100/0/1662120928214/deloitte_logo?e=1734566400&v=beta&t=fFTAQ8enhW-RRWTm0c1PIO9G38_DOJiEppmasOGtznU',
          immediateStartDate: '01-11-2024',
          jobOpenings: '2',
          url: 'https://www.linkedin.com/jobs/view/4019792634',
          salaryRange: '12 LPA',
          experienceLevel: '2-4 years',
          probationDuration: '6 Months',
        },
        {
          title: 'Product Manager',
          company: 'CareStack',
          location: 'Seattle',
          skills: ['Agile', 'Product Development', 'Communication'],
          imageUrl: 'https://media.licdn.com/dms/image/v2/C560BAQH1u_3VYK88yA/company-logo_100_100/company-logo_100_100/0/1679572102869/carestack_logo?e=1734566400&v=beta&t=nbLWhS1dBwlldGmCWLqKCTI3_S4CCv5q0XYNbFkiGBg',
          immediateStartDate: '15-10-2024',
          jobOpenings: '4',
          url: 'https://www.linkedin.com/jobs/view/4014918913',
          salaryRange: '5 LPA',
          experienceLevel: '5-7 years',
          probationDuration: '4 Months',
        },
        {
          title: 'UX Designer',
          company: 'DigiCert',
          location: 'Austin',
          skills: ['Adobe XD', 'Figma', 'User Research'],
          imageUrl: 'https://media.licdn.com/dms/image/v2/D560BAQHTzMMTU4fDuQ/company-logo_100_100/company-logo_100_100/0/1719856855805/digicert_inc__logo?e=1734566400&v=beta&t=45JXLh55dYxFuAxsJfEPu74dNCByff_ti-uL6b_IUlo',
          immediateStartDate: '30-09-2024',
          jobOpenings: '5',
          url: 'https://www.linkedin.com/jobs/view/4018152369',
          salaryRange: '6 LPA',
          experienceLevel: '1-3 years',
          probationDuration: '8 Months',
        },
        {
          title: 'Marketing Specialist',
          company: 'Glider AI',
          location: 'Chicago',
          skills: ['SEO', 'Content Marketing', 'Analytics'],
          imageUrl: 'https://media.licdn.com/dms/image/v2/C4E0BAQHUPIR6pwgZ7w/company-logo_100_100/company-logo_100_100/0/1630648590497/gliderai_logo?e=1734566400&v=beta&t=OMs2hmfqyAW1S7IrXqyh9g8oP63k_WcZVQ0fTLgxMDc',
          immediateStartDate: '01-12-2024',
          jobOpenings: '3',
          url: 'https://www.linkedin.com/jobs/view/4016471590',
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
