import googleapis from 'googleapis';
import parser from './objectParser';
import dotenv from 'dotenv';
import dbentry from '../app/models/models';
import connection from '../config/connection';
import constants from '../config/constants';
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY.split(' | ')
const yapi = new googleapis.youtube_v3.Youtube({
    auth: apiKey.shift()
})
const query = process.env.SEARCH_QUERY

const params =  {
    part: ['snippet'],
    maxResults: 50,
    order: 'date',
    type: ['video'],
    publishedAfter: '2021-01-01T00:00:00Z',
    safeSearch: ['strict'],
    relevanceLanguage: ['en'],
    q: query
}

export default {
    getData: () => {
      console.log('Getting video data')
      yapi.search.list(params).then(response => {
        const parsedData = JSON.parse(JSON.stringify(parser.parseResponse(response.data)))

        parsedData.forEach(video => {
          const check = dbentry.checkUnique(video)
          connection.query(check, (err,results,fields) => {
            if(err){
              throw(err)
            }
            else {
              if(results.length == 0) {
                connection.query(dbentry.setCharset());
                // populating the DB
                const populateDb = dbentry.populateDb(video)
                connection.query(populateDb, (err,results,fields) => {
                  if(err){
                    throw(err)
                  }
                  else{
                    console.log("Data inserted!")
                  }
                })
              }
            }
          })
        })
        
      }).catch(err => {
        if(err.message === constants.QUOTA_EXCEEDED_ERROR_MSG && apiKey.length) {
          const newKey = apiKey.shift()
          yapi = new googleapis.youtube_v3.Youtube({
            auth: apiKey.shift()
          })
          console.log("Current API quota ecxeeded! New API key updated")
        } else {
          console.error(err)
        }
      })
    }
}