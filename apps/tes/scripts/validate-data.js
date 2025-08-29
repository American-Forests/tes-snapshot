#!/usr/bin/env node

/**
 * Data validation script for TES application
 * 
 * This script validates GeoJSON data files against the schema defined in processed_facet_schemas.json.
 * It can be run with yarn data:validation --tesa=<location_name>
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// Logger to handle console output in a lint-friendly way
const logger = {
  info: (...args) => process.env.NODE_ENV !== 'production' && process.stdout.write(args.join(' ') + '\n'),
  error: (...args) => process.stderr.write(args.join(' ') + '\n'),
  warn: (...args) => process.stderr.write('Warning: ' + args.join(' ') + '\n')
};

// Parse command line arguments
const args = process.argv.slice(2);
let tesaLocation = null;
let isNational = false;
let outputFile = null;
let strictMode = false;

// Parse arguments
args.forEach(arg => {
  if (arg.startsWith('--tesa=')) {
    tesaLocation = arg.split('=')[1];
  } else if (arg === '--national') {
    isNational = true;
  } else if (arg.startsWith('--output=')) {
    outputFile = arg.split('=')[1];
  } else if (arg === '--strict') {
    strictMode = true;
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
const validationScriptPath = path.join(repoRoot, 'aws', 'data_validation', 'validate_data.py');
const localDataDir = path.join(repoRoot, 'local');

// Check if schema file exists
if (!fs.existsSync(schemaPath)) {
  logger.error(`Error: Schema file not found at ${schemaPath}`);
  process.exit(1);
}

// Check if validation script exists
if (!fs.existsSync(validationScriptPath)) {
  logger.error(`Error: Validation script not found at ${validationScriptPath}`);
  process.exit(1);
}

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
    file.endsWith('.geojson') || 
    file.endsWith('.geojsonl') || 
    file.endsWith('.json')
  ).map(file => path.join(dir, file));
};

const filesToValidate = findGeoJsonFiles(dataPath);

if (filesToValidate.length === 0) {
  logger.error(`Error: No GeoJSON files found in ${dataPath}`);
  process.exit(1);
}

logger.info(`Found ${filesToValidate.length} files to validate in ${dataPath}`);

// Create output directory if needed
const outputDir = path.join(repoRoot, 'validation-reports');
if (outputFile && !fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to run validation on a file
const validateFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    logger.info(`Validating ${fileName}...`);
    
    // Build command arguments
    const args = [validationScriptPath, filePath, '--schema-path', schemaPath];
    
    if (outputFile) {
      const fileOutputPath = path.join(outputDir, `${path.basename(filePath, path.extname(filePath))}_report.txt`);
      args.push('--output', fileOutputPath);
    }
    
    if (strictMode) {
      args.push('--strict');
    }
    
    // Run the Python validation script
    const pythonProcess = spawn('python', args, {
      stdio: 'inherit'
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        if (strictMode) {
          reject(new Error(`Validation failed for ${fileName}`));
        } else {
          logger.warn(`Warning: Validation issues found in ${fileName}`);
          resolve();
        }
      }
    });
  });
};

// Validate all files
const runValidation = async () => {
  logger.info('Starting data validation...');
  logger.info(`Schema: ${schemaPath}`);
  logger.info(`Data location: ${dataPath}`);
  
  let hasErrors = false;
  
  for (const file of filesToValidate) {
    try {
      await validateFile(file);
    } catch (error) {
      logger.error(error.message);
      hasErrors = true;
    }
  }
  
  if (hasErrors && strictMode) {
    logger.error('Validation failed with errors');
    process.exit(1);
  } else {
    logger.info('Validation complete');
  }
};

// Check for Python environment
const checkPythonEnvironment = () => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['-c', 'import pandas, geopandas, numpy'], {
      stdio: 'pipe'
    });
    
    let errorOutput = '';
    
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        logger.error('Python environment check failed. Missing required packages.');
        logger.error(errorOutput);
        logger.info('Please install the required packages:');
        logger.info('  cd aws/data_validation && pip install -r requirements.txt');
        reject(new Error('Python environment setup required'));
      }
    });
  });
};

// Main execution
(async () => {
  try {
    await checkPythonEnvironment();
    await runValidation();
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
})();
