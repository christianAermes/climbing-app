import mysql.connector
import sqlite3

sqliteDBpath = r"C:\Users\Christian A\Documents\Uni\programmieren\GithubRepos\DataScience-Climbing\database.sqlite"

connSQLite = sqlite3.connect(sqliteDBpath)


climbingDB = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="climbing_app"
)

print("Everything connected")

cursor = connSQLite.cursor()
query = "SELECT * FROM grade"

data = [row for row in cursor.execute(query)]
names = [description[0] for description in cursor.description]
# print(data)
# print(names)


createTableQuery = """
    CREATE TABLE IF NOT EXISTS grade (
        id INTEGER NOT NULL, 
        score INTEGER, 
        fra_routes VARCHAR(10), 
        fra_routes_input BOOLEAN, 
        fra_routes_selector BOOLEAN,
        fra_boulders VARCHAR(10), 
        fra_boulders_input BOOLEAN, 
        fra_boulders_selector BOOLEAN, 
        usa_routes VARCHAR(10), 
        usa_routes_input BOOLEAN, 
        usa_routes_selector BOOLEAN, 
        usa_boulders VARCHAR(10), 
        usa_boulders_input BOOLEAN, 
        usa_boulders_selector BOOLEAN, 
        PRIMARY KEY (id),
        CHECK (fra_routes_input IN (0, 1)), 
        CHECK (fra_routes_selector IN (0, 1)), 
        CHECK (fra_boulders_input IN (0, 1)), 
        CHECK (fra_boulders_selector IN (0, 1)), 
        CHECK (usa_routes_input IN (0, 1)), 
        CHECK (usa_routes_selector IN (0, 1)), 
        CHECK (usa_boulders_input IN (0, 1)), 
        CHECK (usa_boulders_selector IN (0, 1))
        
    )
"""      
        

mysqlCursor = climbingDB.cursor()
# mysqlCursor.execute("DROP TABLE IF EXISTS grade")
# mysqlCursor.execute(createTableQuery)

# print("table created")
# data = [d[1:] for d in data]
# print(data[0])
# print(len(data[0]))
insertQuery = """
    INSERT INTO grade (
        id,
        score,
        fra_routes, 
        fra_routes_input, 
        fra_routes_selector,
        fra_boulders, 
        fra_boulders_input, 
        fra_boulders_selector, 
        usa_routes, 
        usa_routes_input, 
        usa_routes_selector, 
        usa_boulders, 
        usa_boulders_input, 
        usa_boulders_selector
    ) VALUES
    (
        %d,
        %d,
        '%s', 
        %d, 
        %d,
        '%s', 
        %d, 
        %d, 
        '%s', 
        %d, 
        %d, 
        '%s', 
        %d, 
        %d
    )
"""

for d in data:
    insertQuery = """
        INSERT INTO grade (
            id,
            score,
            fra_routes, 
            fra_routes_input, 
            fra_routes_selector,
            fra_boulders, 
            fra_boulders_input, 
            fra_boulders_selector, 
            usa_routes, 
            usa_routes_input, 
            usa_routes_selector, 
            usa_boulders, 
            usa_boulders_input, 
            usa_boulders_selector
        ) VALUES (
            {0},
            {1},
            '{2}',
            {3},
            {4},
            '{5}',
            {6},
            {7},
            '{8}',
            {9},
            {10},
            '{11}',
            {12},
            {13}
        )
    """.format(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13])
    mysqlCursor.execute(insertQuery)
    climbingDB.commit()
# insertQuery = "INSERT INTO grade (id, score) VALUES(0,0)"

# mysqlCursor.execute(insertQuery)
# climbingDB.commit()

print("Data inserted.")
