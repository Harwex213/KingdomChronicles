docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=kingdom_chronicles -v kingdom_chronicles_database:/var/lib/postgresql/data postgres