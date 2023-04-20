# 6003CEM-Web-API
API URl: {Host: Port 3004}/api/v1/

# Important Details
the third party API uses a free trial with ~200 requests per month, it is possible that this has run out

the tables used in the database are relational so if you are testing the deleting routes be sure to delete any data it inherts from,
the tables and their setup can be seen in the file setup.sql in the box.

testing uses npm test, if it takes more then a miniute, stop the tests and restart it, then they should all pass.
do the same if the tests fail, this was most likely caused due to the tests running out of time.
