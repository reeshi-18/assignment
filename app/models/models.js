import connection from '../../config/connection';

export default {
    setCharset : () => {
        const sql = "SET names utf8mb4;";
        return sql;
    },
    checkUnique : data => {
        const sql = "SELECT * FROM ytdata WHERE videoId = " + connection.escape(data.video_id) + ";";
        return sql;
    },
    populateDb : data => {
        let datetime = data.publish_time.replace('T',' ').slice(0,-1)
        const sql = "INSERT into ytdata (videoId,title,description,thumbnail,time,channel_id,channel_name) values (" +
        connection.escape(data.video_id) +
        "," +
        connection.escape(data.title) +
        "," +
        connection.escape(data.description) +
        "," +
        connection.escape(data.thumbnail) +
        "," +
        connection.escape(datetime) +
        "," +
        connection.escape(data.channel_id) +
        "," +
        connection.escape(data.channel_title) +
        ");";

        return sql;  
    },
    getVideoData : () => {
        const sql = "SELECT * FROM ytdata ORDER BY time DESC;";
        return sql;
    },
    searchVideoData : query => {
        const sql = "SELECT *  FROM ytdata  WHERE match(title) against(" + connection.escape(query) + " IN NATURAL LANGUAGE MODE) ORDER by time DESC;";
        return sql;
    }
}