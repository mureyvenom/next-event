import { FormEvent, useRef } from "react";
import Button from "./Button";

interface EventSearchType {
  onSearch: (year: string, month: string) => void;
}

const EventSearch = ({ onSearch }: EventSearchType) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;
    onSearch(
      selectedYear ? selectedYear : "",
      selectedMonth ? selectedMonth : ""
    );
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="controls">
        <div className="control">
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option>2021</option>
            <option>2022</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="month">Month</label>
          <select ref={monthInputRef} id="month">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Search</Button>
    </form>
  );
};

export default EventSearch;
