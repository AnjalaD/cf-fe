import { useState } from "react";
import { Form, Stack } from "react-bootstrap";
import Calender from "./Calender";
import { decodeTime } from "./helpers";
import PageWrapper from "./PageWrapper";

export default function CompanyView({ data }) {
  const [selected, setSelected] = useState();

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  const tempCompanys = {};

  const events = [];
  data.forEach(({ company, end_t, start_t, student_id, student_name }) => {
    if (selected === company) {
      events.push({
        title: student_id + " - " + student_name,
        start: decodeTime(start_t),
        end: decodeTime(end_t),
      });
    }
    tempCompanys[company] = 1;
  });

  const companys = Object.keys(tempCompanys).sort();

  console.log({ events, companys });

  return (
    <PageWrapper>
      <Stack gap={4} className="w-100 py-5">
        <Form.Group
          className="w-100 text-white mb-3 mx-auto"
          style={{ maxWidth: 500 }}
        >
          <Form.Label>Company Name</Form.Label>
          <Form.Select onChange={onChange}>
            <option>Select Company</option>
            {companys.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="w-100 bg-white rounded">
          <Calender events={events} showData={selected && selected !== ""} />
        </div>
      </Stack>
    </PageWrapper>
  );
}
