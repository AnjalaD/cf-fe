import { useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import Calender from "../components/Calender";
import { createTimeslotSet, decodeTime, encodeTime } from "../helpers";
import PageWrapper from "../components/PageWrapper";

const STEP = 5;

export default function FindFreeSlotsView({ data, lastUpdated }) {
  const [sStudent, setSStudent] = useState();
  const [sCompany, setSCompany] = useState();

  const onStudentChange = (_, value) => {
    setSStudent(value);
  };
  const onCompanyChange = (_, value) => {
    setSCompany(value);
  };

  const tempStudents = {};
  const tempCompanys = {};

  const events = [];

  const availTimeslots = [
    ...createTimeslotSet(encodeTime(4, 9, 0), encodeTime(4, 18, 0), STEP),
    ...createTimeslotSet(encodeTime(5, 9, 0), encodeTime(5, 18, 0), STEP),
  ];

  const unavailTimeslots = [];

  data.forEach(({ company, end_t, start_t, student_id, panel }) => {
    if (
      sStudent === student_id ||
      (sCompany?.company === company && sCompany?.panel === panel)
    ) {
      unavailTimeslots.push(...createTimeslotSet(start_t, end_t, STEP));

      events.push({
        title: student_id + " | " + company + " - Panel:" + panel,
        startDate: decodeTime(start_t),
        endDate: decodeTime(end_t),
      });
    }
    tempStudents[student_id] = 1;
    tempCompanys[company + " - Panel:" + panel] = {
      company,
      panel,
    };
  });

  const freeTimeslots = availTimeslots
    .filter((t) => !unavailTimeslots.includes(t))
    .sort();

  console.log({ availTimeslots, unavailTimeslots, freeTimeslots });

  let s = freeTimeslots[0];
  for (let i = 1; i < freeTimeslots.length; i++) {
    console.log({ s });
    if (
      freeTimeslots[i] - freeTimeslots[i - 1] > STEP ||
      i === freeTimeslots.length - 1
    ) {
      const e =
        i === freeTimeslots.length - 1
          ? freeTimeslots[i] + 5
          : freeTimeslots[i - 1] + STEP;

      if (e - s > STEP) {
        events.push({
          title: `${e - s} min - Free Slot`,
          startDate: decodeTime(s),
          endDate: decodeTime(e),
          bg: "#123",
        });
      }
      s = freeTimeslots[i];
    }
  }

  const students = Object.keys(tempStudents).sort();
  const companys = Object.keys(tempCompanys)
    .sort()
    .map((key) => ({ label: key, ...tempCompanys[key] }));

  return (
    <PageWrapper lastUpdated={lastUpdated}>
      <Stack gap={4} sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Autocomplete
            onChange={onStudentChange}
            options={students}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Student ID"
                inputProps={{
                  ...params.inputProps,
                  style: {
                    ...params.inputProps.style,
                    color: "white",
                  },
                }}
              />
            )}
          />
          <Autocomplete
            onChange={onCompanyChange}
            options={companys}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => {
              return option.label === value.label;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Company & Panel"
                inputProps={{
                  ...params.inputProps,
                  style: {
                    ...params.inputProps.style,
                    color: "white",
                  },
                }}
              />
            )}
          />
        </Container>

        <Calender events={events} showData={sStudent || sCompany} />
      </Stack>
    </PageWrapper>
  );
}
