import { useState } from "react";
import { Autocomplete, Container, Stack, TextField } from "@mui/material";
import Calender from "./Calender";
import { decodeTime } from "./helpers";
import PageWrapper from "./PageWrapper";

export default function CompanyView({ data }) {
  const [selected, setSelected] = useState();

  const onChange = (_, value) => {
    setSelected(value);
  };

  const tempCompanys = {};

  const events = [];
  data.forEach(
    ({ company, end_t, start_t, student_id, student_name, panel }) => {
      if (selected?.company === company && selected?.panel === panel) {
        events.push({
          title: student_id + " - " + student_name,
          startDate: decodeTime(start_t),
          endDate: decodeTime(end_t),
        });
      }
      tempCompanys[company + " - Panel:" + panel] = {
        company,
        panel,
      };
    }
  );

  const companys = Object.keys(tempCompanys)
    .sort()
    .map((key) => ({ label: key, ...tempCompanys[key] }));

  return (
    <PageWrapper>
      <Stack gap={4} sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Autocomplete
            onChange={onChange}
            options={companys}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => {
              return option.label === value.label;
            }}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Company & Panel" />
            )}
          />
        </Container>

        <Calender events={events} showData={selected} />
      </Stack>
    </PageWrapper>
  );
}
