const { Observable, Detection, ThreatStage, Report } = require('./models');

async function populateData() {
  try {
    // Sample data for Observables
    const observable1 = await Observable.create({
      category: 'Host',
      subCategory: 'Windows',
      detailType: 'file path',
      dataType: 'string',
      comparisonOperator: 'equals',
      value: 'C:\\Program Files\\Example\\example.exe'
    });

    // Add more observables as needed...

    // Sample data for Detections
    const detection1 = await Detection.create({
      name: 'Malware Detection',
      description: 'Detects presence of malware based on file path'
    });

    // Add more detections...

    // Sample data for ThreatStages
    const threatStage1 = await ThreatStage.create({
      name: 'Initial Access',
      description: 'The adversary is trying to get into your network.',
      mitreAttackTechnique: 'T1190'
    });

    // Add more threat stages...

    // Sample data for Reports
    const report1 = await Report.create({
      sourceOrganization: 'Security Org',
      title: 'Monthly Threat Analysis',
      dateOfAddition: new Date(),
      publicationDate: new Date()
    });

    // Add more reports...

    console.log('Data populated successfully.');
  } catch (error) {
    console.error('Error populating data:', error);
  }
}

populateData();

