'use strict'

const request = require('request')

let url = 'https://jsonbase.com/sls-team/'

let endpoints = [
    {"json-0": "json-793"},
    {"json-1": "json-955"},
    {"json-2": "json-231"},
    {"json-3": "json-931"},
    {"json-4": "json-93"},
    {"json-5": "json-342"},
    {"json-6": "json-770"},
    {"json-7": "json-491"},
    {"json-8": "json-281"},
    {"json-9": "json-718"},
    {"json-10": "json-310"},
    {"json-11": "json-806"},
    {"json-12": "json-469"},
    {"json-13": "json-258"},
    {"json-14": "json-516"},
    {"json-15": "json-79"},
    {"json-16": "json-706"},
    {"json-17": "json-521"},
    {"json-18": "json-350"},
    {"json-19": "json-64"}
]

let count = 1

let valueTrue = 0
let valueFalse = 0

async function waitforme(url, index) {
    await new Promise((reselve, reject) => {
        request(url, async (err, response, body) => {
            if(!err && response.statusCode === 200) {
                reselve(body)
            } else {
                reject(body)
            }
            
        })
    })
    .then(response => JSON.parse(response))
    .then(data => {
        if(data.isDone !== undefined) {
            valueCount(data.isDone)
            console.log(`[Success] ${url}: ${data.isDone}`)
        } else if (data.location.isDone !== undefined) {
            valueCount(data.location.isDone)
            console.log(`[Success] ${url}: ${data.location.isDone}`)
        } else if (data.higherEducation.isDone !== undefined) {
            valueCount(data.higherEducation.isDone)
            console.log(`[Success] ${url}: ${data.higherEducation.isDone}`)
        }

        if(data && (index + 1) >= endpoints.length) {
            console.log(`\nFound True values: ${valueTrue}, \nFound False values: ${valueFalse}`)
        }
    })
    .catch((err) => {
        if(count < 3) {
            waitforme(url, index)
            count++
        } else {
            count = 1
            console.log(`[Fail] ${url}: The endpoint is unavailable`)

            if(err && (index + 1) >= endpoints.length) {
                console.log(`\nFound True values: ${valueTrue}, \nFound False values: ${valueFalse}`)
            }
        }
    })

}

async function printy() {
    for (let [index, item] of endpoints.entries()) {
        await waitforme(url + item[`json-${index}`], index)
    }


}
printy()

function valueCount(value) {
    if(value === true) {
        valueTrue++
    } else {
        valueFalse++
    }
}