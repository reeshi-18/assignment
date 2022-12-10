import model from '../models/models';
import connection from '../../config/connection';
global.__basedir = process.cwd();
export default {

    // Controller to fetch entire DB
    showData : async (req,res) => {
        const sql = model.getVideoData();
        connection.query(sql, (err,results,field) => {
            if(err){
                throw(err);
            }
            else{
                var data = JSON.parse(JSON.stringify(results))
                res.render(__basedir+'/app/views/index.ejs', {videoData : data, startIndex : 1});
            }
        })
        
    },

    // Controller to fetch search queries
    searchData : (req,res) => {
        var query = req.query.key
        const sql = model.searchVideoData(query);
        connection.query(sql, (err,results,field) => {
            if(err){
                throw(err);
            }
            else{
                var data = JSON.parse(JSON.stringify(results))
                res.render(__basedir+'/app/views/index.ejs', {videoData : data, startIndex : 1});
            }
        })
    },

    // Controller to fetch data specific to a page and limit
    getPageData : (req,res) => {
        var page = req.query.page
        var limit = req.query.limit
        console.log(page + " " + limit)
        const sql = model.getVideoData();
        connection.query(sql, (err,results,fields) => {
             if(err){
                throw(err)
            }
            else {
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                var page_data = results.slice(startIndex, endIndex);

                var data = JSON.parse(JSON.stringify(page_data))
                res.render(__basedir+'/app/views/index.ejs', {videoData : data, startIndex : startIndex+1});
            }
        })
    }
}
