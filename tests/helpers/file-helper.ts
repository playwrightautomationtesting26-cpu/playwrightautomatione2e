import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import { error } from 'console'
import { log } from './logger.js'

/**
 * Reads file and returns string. For JSON, parse it before using
 */
function readFile(filePath: any) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No file exists with given name : ${filePath}`)
  }
  log('info', `Reading file : ${filePath}...`)
  let data = fs.readFileSync(filePath, 'utf8')
  return data;
}

/**
 * Writes to target file. If target is json, stringify data
 * @param filePath fullpath incl extn of file
 * @param data
 */

function writeFile(filePath: any, data: any) {
  try {
    fs.writeFileSync(filePath, data)
    log('info', `Writing file : ${filePath}...`)
  }
  catch (err) {
    new Error(`Error writing to : ${filePath}, ${err}`)

  }
}

/**
 *Reads a CSV file and returns an array of objects representing the data.
 * @param filePath
 * @returns Array of object
 */
function readCSVFile(filePath: any) {
  const csvDataStr = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const scvDataArray = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
  return scvDataArray
}

export { readFile, writeFile, readCSVFile }
