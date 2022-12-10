## Setup

Copy the contents of the .env.example to a .env file and set the environment variables

``` cp .env.example .env ```

### Installing the dependencies

``` npm install ```

### Starting the server

``` npm start ```

## Testing the api

``` GET / : Home Page to see all the fetched data ```

``` GET /search/?key={key} : Searches a given key ```

``` GET /pagination/?page={page}&limit={limit} : To see the paginated response with given page number and limit ```