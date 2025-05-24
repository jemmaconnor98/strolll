import {useEffect, useState} from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

interface Prescription {
  id: number;
  patientName: string;
  exercises: string[];
  datePrescribed: string;
}

const PrescriptionsPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patientName, setPatientName] = useState("");
  const [exercises, setExercises] = useState("");

  useEffect(() => {
    axios
      .get("/api/prescription")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setPrescriptions(data);
        } else {
          console.error("Unexpected response:", data);
          setPrescriptions([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching prescriptions:", err);
        setPrescriptions([]);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post<Prescription>("/api/prescription", {
        patientName,
        exercises: exercises.split(",").map((e) => e.trim()),
      })
      .then((res) => {
        setPrescriptions([...prescriptions, res.data]);
        setPatientName("");
        setExercises("");
      });
  };

  const isSubmitDisabled = !patientName.trim() || !exercises.trim();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Prescribe Exercises
      </Typography>
      <Stack spacing={2} direction="column" maxWidth={400}>
        <TextField
          required
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          fullWidth
        />
        <TextField
          required
          label="Exercises (comma-separated)"
          value={exercises}
          onChange={(e) => setExercises(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </Stack>

      <Typography variant="h5" sx={{mt: 4}}>
        Existing Prescriptions
      </Typography>
      <List>
        {prescriptions.map((p) => (
          <ListItem key={p.id} divider>
            <ListItemText
              primary={`${p.patientName}`}
              secondary={`Exercises: ${p.exercises.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PrescriptionsPage;
