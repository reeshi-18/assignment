export default {
    parseResponse: data => {
      const videoData = []
      data.items.forEach(object => {
        videoData.push({
          video_id: object.id.videoId,
          title: object.snippet.title,
          description: object.snippet.description,
          thumbnail: object.snippet.thumbnails.high.url,
          publish_time: object.snippet.publishTime,
          channel_id: object.snippet.channelId,
          channel_title: object.snippet.channelTitle
        })
      })
      return videoData
    }
  }