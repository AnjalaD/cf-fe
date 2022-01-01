import { useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import Calender from "./Calender";
import { decodeTime } from "./helpers";
import PageWrapper from "./PageWrapper";

export default function StudentsView({ data }) {
  const [selected, setSelected] = useState();

  const onChange = (_, value) => {
    setSelected(value);
  };

  const tempStudents = {};

  const events = [];
  data.forEach(({ company, end_t, start_t, student_id }) => {
    if (selected === student_id) {
      events.push({
        title: company,
        startDate: decodeTime(start_t),
        endDate: decodeTime(end_t),
      });
    }
    tempStudents[student_id] = 1;
  });

  const students = Object.keys(tempStudents).sort();

  console.log({ events, students });

  return (
    <PageWrapper>
      <Stack gap={4} sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Autocomplete
            onChange={onChange}
            options={students}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Student ID" />
            )}
          />
        </Container>

        <Calender events={events} showData={selected && selected !== ""} />
      </Stack>
    </PageWrapper>
  );
}
