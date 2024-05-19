﻿using Microsoft.Data.SqlClient;

namespace ReactApp.Server;

public static class DatabaseAPI
{
    public static async Task<T> ExtractDataDb<T>(string query, SqlParameter[] parameters,
        Func<SqlDataReader, T> processResult)
    {
        var result = default(T); // variable to store the result of db query

        try
        {
            // Establish connection to db
            using (SqlConnection connection = await DbConnection.GetOpenConnectionAsync("EcoEstimate-vault", "azure-sql-connectionstring-485b7"))
            {
                // Create a SqlCommand object with the provided query and connection
                SqlCommand command = new SqlCommand(query, connection);

                // Add parameters to the command if any are provided
                command.Parameters.AddRange(parameters);

                // Execute the query asynchronously
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    // Process the result using the provided delegate
                    result = processResult(reader);
                }
            }
        }

        catch (Exception ex)
        {
            // Handle any exceptions that occur during database interaction
            Console.WriteLine($"An error occurred while executing the query: {ex.Message}");
        }

        // Return the result of the query (or null if an error occurred)
        return result;
    }
}