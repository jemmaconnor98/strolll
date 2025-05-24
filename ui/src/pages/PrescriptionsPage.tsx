import {useEffect, useState} from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";

interface Prescription {
  id: number;
  patientFirstName: string;
  PatientLastName: string;
  exercises: string[];
  datePrescribed: string;
}

const PrescriptionsPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
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
        patientFirstName,
        patientLastName,
        exercises: exercises.split(",").map((e) => e.trim()),
      })
      .then((res) => {
        setPrescriptions([...prescriptions, res.data]);
        setPatientFirstName("");
        setPatientLastName("");
        setExercises("");
      });
  };

  const isSubmitDisabled =
    !patientFirstName.trim() || !patientLastName.trim() || !exercises.trim();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Prescribe Exercises
      </Typography>
      <Stack spacing={2} direction="column" maxWidth={400}>
        <TextField
          required
          label="Patient First Name"
          value={patientFirstName}
          onChange={(e) => setPatientFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          required
          label="Patient Last Name"
          value={patientLastName}
          onChange={(e) => setPatientLastName(e.target.value)}
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

      <Typography variant="h5" sx={{mt: 4, mb: 2}}>
        Existing Prescriptions
      </Typography>
      <Stack spacing={2}>
        {prescriptions.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No prescriptions found. Add one above!
          </Typography>
        ) : (
          prescriptions.map((p) => (
            <Card
              key={p.id}
              variant="outlined"
              sx={{width: "100%", maxWidth: 600}}
            >
              {" "}
              <CardContent>
                <Typography variant="h6" component="div">
                  {p.patientFirstName} {p.PatientLastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                  Date Prescribed:{" "}
                  {new Date(p.datePrescribed).toLocaleDateString()}
                </Typography>
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                  {p.exercises.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No exercises prescribed.
                    </Typography>
                  ) : (
                    p.exercises.map((exercise, index) => (
                      <Chip
                        key={index}
                        label={exercise}
                        variant="filled"
                        color="primary"
                      />
                    ))
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </>
  );
};

export default PrescriptionsPage;
