#!/usr/bin/env node

/**
 * Wrapper script for data validation
 * This script passes arguments to the Python validation script
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// Logger (uses process.stdout/stderr directly to avoid linting issues with console)
const logger = {
  info: (...args) => process.stdout.write(args.join(' ') + '\n'),
  error: (...args) => process.stderr.write(args.join(' ') + '\n'),
  warn: (...args) => process.stderr.write('Warning: ' + args.join(' ') + '\n')
};

// Parse command line arguments
const args = process.argv.slice(2);
let tesaLocation = null;
let isNational = false;
let validateFeatures = false;

// Parse arguments
args.forEach(arg => {
  if (arg.startsWith('--tesa=')) {
    tesaLocation = arg.split('=')[1];
  } else if (arg === '--national') {
    isNational = true;
  } else if (arg === '--validate-features') {
    validateFeatures = true;
  }
});

// Validate arguments
if (!tesaLocation && !isNational) {
  logger.error('Error: You must specify either --tesa=<location> or --national');
  process.exit(1);
}

if (tesaLocation && isNational) {
  logger.error('Error: You cannot specify both --tesa and --national');
  process.exit(1);
}

// Set paths
const repoRoot = path.resolve(__dirname, '..');
const schemaPath = path.join(repoRoot, 'data', 'processed_facet_schemas.json');
const localDataDir = path.join(repoRoot, 'local');

// Determine data path
let dataPath;
if (isNational) {
  dataPath = path.join(localDataDir, 'national');
} else {
  dataPath = path.join(localDataDir, 'location', tesaLocation);
}

// Check if data directory exists
if (!fs.existsSync(dataPath)) {
  logger.error(`Error: Data directory not found at ${dataPath}`);
  logger.info('You may need to download the data first with:');
  if (isNational) {
    logger.info('  yarn download:national');
  } else {
    logger.info(`  TESA=${tesaLocation} yarn download:tesa`);
  }
  process.exit(1);
}

// Find GeoJSON files to validate
const findGeoJsonFiles = (dir) => {
  const files = fs.readdirSync(dir);
  return files.filter(file => 
    // Only include .geojsonl files
    file.endsWith('.geojsonl') && 
    // Exclude trees-related files
    !file.toLowerCase().includes('trees')
  ).map(file => path.join(dir, file));
};

const filesToValidate = findGeoJsonFiles(dataPath);

if (filesToValidate.length === 0) {
  logger.error(`Error: No GeoJSON files found in ${dataPath}`);
  process.exit(1);
}

logger.info(`Found ${filesToValidate.length} files to validate in ${dataPath}`);

// Execute validation for each file
logger.info('Starting data validation...');
logger.info(`Schema: ${schemaPath}`);
logger.info(`Data location: ${dataPath}`);

// Process each file
let exitCode = 0;

const runValidationForFile = (index) => {
  if (index >= filesToValidate.length) {
    if (exitCode === 0) {
      logger.info('Validation complete. All files passed.');
    } else {
      logger.info('Validation complete. Some files had validation issues.');
    }
    process.exit(exitCode);
    return;
  }

  const file = filesToValidate[index];
  const fileName = path.basename(file);
  logger.info(`Validating ${fileName}...`);

  // Build the command to run the Python script
  const pythonEnvSetup = path.join(repoRoot, 'aws', 'to_postgres', '.venv', 'bin', 'activate');
  
  // Add feature validation if requested and the file is a geojsonl
  const featureValidation = validateFeatures && file.endsWith('.geojsonl') ? ' --validate-features' : '';
  
  const command = `cd ${path.join(repoRoot, 'aws', 'data_validation')} && ` +
                  `source ${pythonEnvSetup} && ` + 
                  `python validate_data.py "${file}" --schema-path "${schemaPath}"${featureValidation}`;

  // Run the command
  const childProcess = spawn('bash', ['-c', command], {
    stdio: 'inherit'
  });

  childProcess.on('close', (code) => {
    if (code !== 0) {
      exitCode = 1;
    }
    runValidationForFile(index + 1);
  });
};

// Start the validation process
runValidationForFile(0);
