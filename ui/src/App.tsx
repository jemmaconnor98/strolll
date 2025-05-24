import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {AppBar, Toolbar, Button, Typography, Container} from "@mui/material";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import ResultsPage from "./pages/ResultsPage";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Physiotherapy App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Prescriptions
          </Button>
          <Button color="inherit" component={Link} to="/results">
            Results
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{mt: 4}}>
        <Routes>
          <Route path="/" element={<PrescriptionsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
