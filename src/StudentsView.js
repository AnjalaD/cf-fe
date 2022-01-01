import { useState } from "react";
import { Form, Stack } from "react-bootstrap";
import Calender from "./Calender";
import { decodeTime } from "./helpers";
import PageWrapper from "./PageWrapper";

export default function StudentsView({ data }) {
  const [selected, setSelected] = useState();

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  const tempStudents = {};

  const events = [];
  data.forEach(({ company, end_t, start_t, student_id }) => {
    if (selected === student_id) {
      events.push({
        title: company,
        start: decodeTime(start_t),
        end: decodeTime(end_t),
      });
    }
    tempStudents[student_id] = 1;
  });

  const students = Object.keys(tempStudents).sort();

  console.log({ events, students });

  return (
    <PageWrapper>
      <Stack gap={4} className="w-100 py-5">
        <Form.Group
          className="w-100 text-white mb-3 mx-auto"
          style={{ maxWidth: 500 }}
        >
          <Form.Label>Student ID</Form.Label>
          <Form.Select onChange={onChange}>
            <option value="">Select Student ID</option>
            {students.map((id) => (
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
