import {useEffect, useState} from "react";
import axios from "axios";
import {Typography, Stack, Card, CardContent, Chip} from "@mui/material";

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
      <Stack spacing={2}>
        {results.map((r) => (
          <Card key={r.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                {r.patientName} - {r.exercise}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Date: {new Date(r.date).toLocaleDateString()}
              </Typography>
              <Chip
                label={`Score: ${r.score}`}
                color={r.score >= 70 ? "success" : "warning"}
                size="medium"
                sx={{fontWeight: "bold"}}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default ResultsPage;
