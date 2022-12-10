import app from './config/app';

const PORT = process.env.port || 8000

app.listen(PORT, (err) => {
  if (err){
    throw err;
  }
  else{
    console.log(`Server started at ${PORT}`);
  }
});