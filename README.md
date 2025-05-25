# strolll

Prototype for a digital physiotherapy platform

# Tech Stack
Frontend: React (with TypeScript)

UI Components: Material-UI (MUI)

HTTP Client: Axios

Backend: .NET (ASP.NET Core Web API)

Language: C#

# Features
Prescriptions Page
Allows input for Patient Name and Exercises (comma-separated).

Submits new prescriptions to the .NET backend via a POST request.

Displays a list of existing prescriptions fetched from the backend.

Provides a success message using Material-UI's Snackbar upon successful prescription submission.

Results Page
Fetches and displays mocked session results from the .NET backend via a GET request.

Shows Patient Name, Exercise, Score, and Date for each session.

# Setup and Running Instructions
Please follow these steps to get the application running locally.

Backend (.NET API)
Navigate to the backend Project:
Open your terminal or command prompt and navigate to the directory containing your .NET project file (.csproj).

Restore Dependencies:

```
dotnet restore
```

Run the Backend API:

```
dotnet run
```

The API will run on http://localhost:5117 (as configured in Properties/launchSettings.json).

Frontend (React Application)
Navigate to the ui Project:
Open a new terminal or command prompt and navigate to the directory containing your React project (package.json).

Install Dependencies:

```
npm install
```
or
```
yarn install
```

Run the React Development Server:

```
npm run dev
```

or
```
yarn dev
```

The React application will run on http://localhost:5173.

A Vite proxy is configured in vite.config.ts to forward all /api requests from the frontend (http://localhost:5173) to the backend (http://localhost:5117). This is crucial for cross-origin communication during development.

# Design Notes
Data is mocked and stored in static in-memory lists on the backend. This means data will reset every time the backend application is restarted.
CORS Configuration: Cross-Origin Resource Sharing (CORS) is configured in Program.cs on the .NET backend to allow requests from http://localhost:5173, ensuring communication with the React frontend.
UI Library: Material-UI (MUI) was chosen for the frontend components to provide a clean and consistent user interface.

# What I Would Have Done with More Time

Frontend Error Handling and User Feedback:
Implement more comprehensive .catch() blocks for all axios API calls (GET and POST). This would allow for displaying user-friendly error messages (e.g., via Snackbar with severity="error") in case of network issues or backend validation failures, rather than just logging to the console and add a success messgae when a exercise was successfully prescribed.

Improved User Experience:
Clearer Input Fields: For exercises, consider a more structured input than a comma-separated string, for example, multi-select for better data entry and validation.
