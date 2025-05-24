import {useEffect, useState} from "react";
import axios from "axios";
import {Typography, List, ListItem, ListItemText} from "@mui/material";

interface Result {
  id: number;
  patientName: string;
  exercise: string;
  score: number;
  date: string;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    axios.get<Result[]>("/api/result").then((res) => setResults(res.data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Session Results
      </Typography>
      <List>
        {results.map((r) => (
          <ListItem key={r.id} divider>
            <ListItemText
              primary={`${r.patientName} - ${r.exercise}`}
              secondary={`Score: ${r.score} | Date: ${new Date(
                r.date
              ).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ResultsPage;
